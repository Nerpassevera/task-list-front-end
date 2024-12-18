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
    .catch((error) => console.error('Error fetching data: ', error));
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
      .then((fetchedTasks) => setTasks( () => fetchedTasks));
  };

  // convert the data from the server to the format we need
  const convertFromApi = (apiTask) => {
    return {
      ...apiTask,
      isComplete: apiTask.is_complete,
    };
  };

  // Define toggleComplete function
  const toggleComplete = (id) => {
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    return setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  // make a functin to fetch data from the server

  // const deleteDog = (id) => {
  //   axios
  //     .delete(`${URL}/${id}`)
  //     .then(() => {
  //       const newDogs = dogs.filter((dog) => dog.id !== id);
  //       setDogs(newDogs);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const addDog = (dogData) => {
  //   axios
  //     .post(URL, dogData)
  //     .then((response) => {
  //       const newDog = response.data;
  //       const newDogs = [...dogs, newDog];
  //       setDogs(newDogs);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className='App'>
      <header className='App-header'>
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
