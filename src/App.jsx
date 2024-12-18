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

const markTaskCompleteApi = (id, isComplete) => {
  const completeAction = isComplete ? 'mark_complete' : 'mark_incomplete';

  return axios
    .patch(`${kbaseURL}/tasks/${id}/${completeAction}`, {
      completed_at: new Date().toISOString(),
    })
    .then((response) => response.data.task)
    .catch((error) => console.error('Error marking task complete: ', error));
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
        console.log('fetchedTasks', fetchedTasks);

        setTasks(() => fetchedTasks);
      });
  };

  // convert the data from the server to the format we need
  const convertFromApi = (apiTask) => {
    const convertedTask = {
      ...apiTask,
      isComplete: apiTask.is_complete,
    };
    if (apiTask.completed_at) {
      convertedTask.completedAt = new Date(apiTask.completed_at);
    }
    delete convertedTask['is_complete'];
    delete convertedTask['completed_at'];
    console.log('convertedTask', convertedTask);

    return convertedTask;
  };

  // Define toggleComplete function
  const toggleComplete = (id, isComplete) => {
    console.log('toggleComplete', id, isComplete);

    markTaskCompleteApi(id, isComplete)
      .then((apiTask) => convertFromApi(apiTask))
      .then(({ task }) => console.log('AAAAAAAAAA', task.id))
      .then(({ task }) => updateTasksState(task.id))
      .catch((error) => console.error('Error marking task complete: ', error));
  };

  const updateTasksState = (id) => {
    console.log('updateTasksState', id);

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
    axios
      .delete(`${kbaseURL}/tasks/${id}`)
      .then(() => setTasks((tasks) => tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error('Error deleting task: ', error));
  };

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
