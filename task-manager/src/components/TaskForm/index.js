import React, { useState, useEffect } from 'react';
import './index.css';

const TaskForm = ({ onAdd, initialValues, onUpdate, onCancel }) => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    if (initialValues) {
      setTask(initialValues);
    } else {
      setTask({ title: '', description: '', dueDate: '' });
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialValues) {
      onUpdate(task);
    } else {
      onAdd(task);
    }
    setTask({ title: '', description: '', dueDate: '' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">
          {initialValues ? 'Update Task' : 'Add Task'}
        </button>
        {initialValues && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
