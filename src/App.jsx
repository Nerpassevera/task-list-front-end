import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kbaseURL = 'http://127.0.0.1:5000';

// Logic for fetching data from the server
const getAllTasksApi = () => {
  return axios
    .get(`${kbaseURL}/tasks`)
    .then((response) => response.data)
};

const markTaskCompleteApi = (id, isComplete) => {
  const completeAction = isComplete ? 'mark_complete' : 'mark_incomplete';

  return axios
    .patch(`${kbaseURL}/tasks/${id}/${completeAction}`, {
      completed_at: new Date().toISOString(),
    })
    .then((response) => {
      if (!response.data) {
        throw new Error('No response data received');
      }
      return response.data;
    })
};

// App component
const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  // make a function to get all tasks
  const getAllTasks = () => {
    getAllTasksApi()
      .then((tasks) => {
        return tasks.map((task) => convertFromApi(task));
      })
      .then((fetchedTasks) => {
        setTasks(() => fetchedTasks);
      });
  };

  // convert the data from the server to the format we need
  const convertFromApi = (task) => {
    const convertedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      isComplete: task.is_complete,
    };
    if (task.completed_at) {
      convertedTask.completedAt = new Date(task.completed_at);
    }

    delete convertedTask.is_complete;
    delete convertedTask.completed_at;
    return convertedTask;
  };

  // Define toggleComplete function
  const toggleComplete = (id, isComplete) => {
    markTaskCompleteApi(id, isComplete)
      .then(({task}) => {
        const newTask = convertFromApi(task);
        updateTasksState(newTask);
      });
  };

  const updateTasksState = (newTask) => {
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id === newTask.id) {
          return newTask;
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    axios
      .delete(`${kbaseURL}/tasks/${id}`)
      .then(() => setTasks((tasks) => tasks.filter((task) => task.id !== id)))
  };

  // const addDog = (dogData) => {
  //   axios
  //     .post(URL, dogData)
  //     .then((response) => {
  //       const newDog = response.data;
  //       const newDogs = [...dogs, newDog];
  //       setDogs(newDogs);
  //     })
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
