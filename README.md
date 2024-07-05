# Task Scheduler
To see System Design, Read this: [System Design of distributed task scheduler](https://github.com/mHuzefa/task_scheduler/blob/main/System%20Design%20of%20distributed%20task%20scheduler.md)
## Overview
The distributed task scheduler is designed to allow clients to register both  one-time and recurring tasks, ensuring their execution within 10 seconds of  the scheduled time. The system aims to be highly available, durable,  scalable, and cost-effective

This project is built using Rails for the backend and React for the frontend. The system utilizes Kafka as a message broker, Redis for caching, and Sidekiq for background job processing. The entire application is containerized using Docker.

## Features

- Task creation with support for one-time and recurring tasks
- Cron expression selection for scheduling recurring tasks
- Background job processing with Sidekiq
- Message brokering with Kafka
- Caching with Redis
- Fully containerized with Docker

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose
- Node.js
- npm or yarn

## Setup

1. Clone the repository  
`git clone https://github.com/yourusername/repository_name.git`
2. Run Command
	`docker-compose up --build -d` 
3. Go to `http://localhost:8080` for client interface

## Servers Ports
Client: `8080`

API: `3000`

Redis: `6379`

Kafka: `kafka:9092`
