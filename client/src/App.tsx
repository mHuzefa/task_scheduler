import './App.css';
import TaskManager from './components/TaskManager';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <TaskManager />
    </div>
  );
}

export default App;
