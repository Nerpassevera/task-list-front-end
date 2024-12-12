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
    const updatedsTasks = tasks.map((task) => {
      if (task.id === id) {
        return {...task, isComplete: !task.isComplete};
      }else {
        return task;
      }
    });
    setTasks(updatedsTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={tasks} onToggleComplete={toggleComplete}/>
        </div>
      </main>
    </div>
  );
};


export default App;
