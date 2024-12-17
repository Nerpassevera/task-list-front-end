import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const kbaseURL = 'http://localhost:5000';

  // Define toggleComplete function
  const toggleComplete = (id) => {
    setTasks( tasks => {
      return tasks.map((task) => {
        if (task.id === id) {
          return {...task, isComplete: !task.isComplete};
        }else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    return setTasks(tasks => tasks.filter((task) => task.id !== id));
  };

  // make a functin to fetch data from the server

  const getAllTasksApi = () => {
    return axios.get(`${kbaseURL}/tasks`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }
  // convert the data from the server to the format we need
  const convertFromApi = (tasks) => {
    const newTask = {
      ...apiTask,
      isComplete: apiTask.is_complete,
    }

  // make a function to get all tasks
  const getAllTasks = () => {
    getAllTasksApi()
      .then((tasks) => {
        const newTasks = tasks.map((task) => {
          return convertFromApi(task);
        });
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDeleteTask={deleteTask}/>
        </div>
      </main>
    </div>
  );
};


export default App;
