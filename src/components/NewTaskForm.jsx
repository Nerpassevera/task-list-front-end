import { useState } from 'react';
import PropTypes from 'prop-types';
import './formStyle.css';

const NewTaskForm = ({ addTask }) => {
  const taskForm = {
    title: '',
    description: '',
    // goal: '',
  };

  const [task, setTask] = useState(taskForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      addTask(task);
      setTask(taskForm);
    }
  };

  // const goalOptions = goals.map(goal => <option value="goal" key={goal.id}>{goal.title}</option>)

  return (
    <div id="form-container">
      <h2>Add new task</h2>
      <form onSubmit={handleSubmit}>
        <div id="form-grid">
          <label htmlFor="task-title">Task title: </label>
          <input
            id="task-title"
            name="task"
            type="text"
            value={task.title}
            onChange={(e) => {
              setTask((taskForm) => ({ ...taskForm, title: e.target.value }));
            }}
            placeholder="Enter a task"
          />
          <label htmlFor="task-description">Task description: </label>
          <input
            id="task-description"
            name="description"
            type="text"
            value={task.description}
            onChange={(e) => {
              setTask((taskForm) => ({
                ...taskForm,
                description: e.target.value,
              }));
            }}
            placeholder="Enter a description"
          />
          {/* <label htmlFor='goal'>Goal: </label>
          <input
            id='goal'
            name='goal'
            type='text'
            value={task.goal}
            onChange={(e) => {setTask((taskForm) => ({...taskForm, goal: e.target.value}))}}
            placeholder='Enter a goal'
          /> */}
          {/* <label htmlFor="goal-list">Task goal:</label> */}

          {/* <select name="goal-list" id="goal-list">
            {goalOptions}
          </select> */}
        </div>
        <input type="submit" onSubmit={handleSubmit} />
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
