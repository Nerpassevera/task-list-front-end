import { useState } from 'react';
import PropTypes from 'prop-types';
import './formStyle.css';

const NewGoalForm = (addGoal) => {
  const[goal, setGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goal) {
      addGoal(goal);
      setGoal('');
    }
  };

  return (
    <div id="form-container">
      <h2>Add new goal</h2>
      <form onSubmit={handleSubmit}>
        <div id="form-grid">
          <label htmlFor="goal-title">Task title: </label>
          <input
            id="goal-title"
            name="goal"
            type="text"
            value={goal}
            onChange={(e) => {
              setGoal(() => (e.target.value));
            }}
            placeholder="Enter a goal"
          />
        </div>
        <input type="submit" onSubmit={handleSubmit} />
      </form>
    </div>
  );
};

NewGoalForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewGoalForm;
