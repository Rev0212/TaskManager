import React from 'react';
import './index.css';

const TaskItem = ({ todoDetails, deleteTodo, onEdit }) => {
  const { id, title, description, dueDate } = todoDetails;

  return (
    <li className="todo-item">
      <div className="todo-content">
        <h3 className="todo-title">{title}</h3>
        <p className="todo-description">{description}</p>
        <p className="todo-due-date">Due Date: {dueDate ? new Date(dueDate).toLocaleDateString() : 'No due date'}</p>
      </div>
      <div className="todo-actions">
        <button className="edit-button" onClick={() => onEdit(todoDetails)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => deleteTodo(id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
