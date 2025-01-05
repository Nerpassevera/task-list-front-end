import { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

// Update the toggle complete feature of each Task to update the state of the task data stored in App.
// Add a feature to delete a task from the task data stored and rendered by the App.


const Task = ({ id, title, description, isComplete, onToggleComplete, onDeleteTask }) => {
  const [fold, setFold] = useState(true);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <div>
      <li className="tasks__item">
        <button
          className={`tasks__item__toggle ${buttonClass}`}
          onClick={() => {onToggleComplete(id, !isComplete)}}
        >
          {title}
        </button>
        <button 
          className="tasks__item__description button"
          onClick={() => {setFold(fold => !fold)}}>
          {fold ? '⏬️' : '⏫️'}
        </button>
        <button className="tasks__item__remove button"
        onClick={() => onDeleteTask(id)}
        >
          🗑️
        </button>
      </li>
      {!fold && <p className='task__item__description text'>{description}</p>}
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
