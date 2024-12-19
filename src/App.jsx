import TaskList from './components/TaskList.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';


const kbaseURL = 'http://127.0.0.1:5000';

// convert the data from the server to the format we need
const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete ?? false,
  } 
  delete newTask.is_complete;
  return newTask;
}

// make a functin to fetch data from the server
const getAllTasksApi = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then((response) => {
      const apiTasks = response.data;
      const newTasks = apiTasks.map(convertFromApi);
      return newTasks;
    })
    .catch((error) => {
      console.error('Error fetching tasks  data: ', error);
    });
};


const toggleCompleteApi = (id, isComplete) => {
  const endpointAction = isComplete ? 'mark_incomplete' : 'mark_complete';
  return axios.patch(`${kbaseURL}/tasks/${id}/${endpointAction}`)
    .then((response) => convertFromApi(response.data))
    .catch((error) => {
      console.error('Error toggling task completion:', error);
    });
};


const deleteTaskApi = (id) => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch(error => {
      console.log(error);
    })
};  

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  // make a function to get all tasks
  const getAllTasks = () => {
    getAllTasksApi()
      .then((tasks) => {
        setTasks(tasks);
        });
  };

  const handleToggleComplete = (id) => {
    const task = tasks.find((task) => task.id === id);

    toggleCompleteApi(id, task.isComplete)
      .then((updatedTask) => {
        setTasks((taskData) =>
        taskData.map((task) => (task.id === id ? updatedTask : task))
      );
    });
  };

  const handleDeleteTask = (id) => {
    deleteTaskApi(id)
      .then(() => {
        setTasks((taskData) => taskData.filter((task) => task.id !== id));
      });
  };

  const handleSubmit = (data) => {
    console.log('sending data:', data);
    axios.post(`${kbaseURL}/tasks`, data)
      .then((result) => {
        setTasks((prevTasks) => [convertFromApi(result.data), ...prevTasks,]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <NewTaskForm handleSubmit={handleSubmit} />
          <TaskList 
          tasks={tasks} 
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>
    </div>
  );
}


export default App;
