require 'fugit'

class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /tasks
  def index
    tasks = Task.all
    render json: tasks
  end

  # GET /tasks/:id
  def show
    render json: @task
  end

  def create
    task = Task.new(task_params)

    ActiveRecord::Base.transaction do
      if task.recurring? && task.execution_time.nil?
        begin
          task.execution_time = next_execution_time(task.cron_expression)
        rescue ArgumentError => e
          render json: { errors: [e.message] }, status: :unprocessable_entity
          raise ActiveRecord::Rollback
        end
      end

      if task.save
        render json: task, status: :created
      else
        render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    end
  end



  # PUT /tasks/:id
  def update
    ActiveRecord::Base.transaction do
      if @task.update(task_params)
        if @task.recurring? && @task.cron_expression.present?
          @task.update(execution_time: next_execution_time(@task.cron_expression))
        end
        render json: @task
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end
    end
  rescue Fugit::CronParsingError => e
    render json: { errors: ["Invalid cron expression: #{e.message}"] }, status: :unprocessable_entity
  end

  # DELETE /tasks/:id
  def destroy
    ActiveRecord::Base.transaction do
      @task.destroy
      render json: { status: 'Task deleted successfully' }, status: :ok
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ['Task not found'] }, status: :not_found
  end

  def task_params
    params.require(:task).permit(:name, :execution_time, :recurring, :cron_expression)
  end

  def next_execution_time(cron_expression)
    cron = Fugit::Cron.parse(cron_expression)
    raise ArgumentError, 'Invalid cron expression' if cron.nil?

    cron.next_time.to_i
  end
end
