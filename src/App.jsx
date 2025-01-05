import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';
import NewTaskForm from './components/NewTaskForm.jsx';
import {
  addInstanceApi,
  markTaskCompleteApi,
  deleteInstanceApi,
  getAllInstancesApi,
} from './utilities/utilityFunctions.js';

// Goal for the task functionality (in development)
// import NewGoalForm from './components/NewGoalForm.jsx';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Goal for the task functionality (in development)
  // const [goals, setGoals] = useState([]);
  // const [showGoalForm, setShowGoalForm] = useState(false);

  useEffect(() => {
    getAllTasks();
    // Goal for the task functionality (in development)
    // getAllGoals();
  }, []);

  // make a function to get all tasks
  const getAllTasks = () => {
    getAllInstancesApi('tasks')
      .then((tasks) => tasks.map((task) => convertTaskFromApiHelper(task)))
      .then((fetchedTasks) => {
        setTasks(() => fetchedTasks);
      });
  };

  const addTask = (newTask) => {
    addInstanceApi('tasks', newTask).then((task) =>
      setTasks((prevTasks) => [
        ...prevTasks,
        convertTaskFromApiHelper(task.task),
      ])
    );
  };

  // Goal for the task functionality (in development)
  // const getAllGoals = () => {
  //   getAllInstancesApi('goals')
  //     .then((goals) => goals.map((goal) => convertFromApi(goal)))
  //     .then((fetchedGoals) => {
  //       setGoals(() => fetchedGoals);
  //     });
  // };

  // convert the data from the server to the JS format
  const convertTaskFromApiHelper = (task) => {
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
    markTaskCompleteApi(id, isComplete).then(({ task }) => {
      const newTask = convertTaskFromApiHelper(task);
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
    deleteInstanceApi('tasks', id).then(() =>
      setTasks((tasks) => tasks.filter((task) => task.id !== id))
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        {/* {showGoalForm && <NewGoalForm addGoal={() => console.log('pfffrrrh')}/>}
        <br />
        <button onClick={() => setShowGoalForm((show) => !show)}>Show goal form</button>
        <br /> */}
        {showTaskForm && <NewTaskForm addTask={addTask} goals={goals} />}
        <br />
        <button
          className="show-new-task-form button"
          onClick={() => setShowTaskForm((show) => !show)}
        >
          {showTaskForm ? 'Hide task form' : 'Show task form'}
        </button>
        <br />
        <div className="task-list-wrapper">
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
