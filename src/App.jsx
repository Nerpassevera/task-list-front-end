import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

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
  const [tasks, setTasks] = useState(TASKS);

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
