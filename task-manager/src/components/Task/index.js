import React, { Component } from 'react';
import TaskItem from '../TaskItem';
import axios from 'axios';
import './index.css';
import TaskForm from '../TaskForm';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todosList: [],
      editingTask: null,
    };
  }

  async componentDidMount() {
    await this.fetchTasks();
  }

  fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      this.setState({ todosList: response.data });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      this.setState((prevState) => ({
        todosList: prevState.todosList.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  handleAddTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', task);
      const savedTask = response.data;
      this.setState((prevState) => ({
        todosList: [...prevState.todosList, savedTask],
      }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  handleEdit = (task) => {
    this.setState({ editingTask: task });
  };

  handleUpdateTask = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${updatedTask.id}`, updatedTask);
      this.setState((prevState) => ({
        todosList: prevState.todosList.map((todo) =>
          todo.id === updatedTask.id ? updatedTask : todo
        ),
        editingTask: null,
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  handleCancelEdit = () => {
    this.setState({ editingTask: null });
  };

  render() {
    const { todosList, editingTask } = this.state;

    return (
      <div className="app-container">
        <div className="task-container">
          <h1 className="heading">TASK MANAGER</h1>
          <TaskForm
            onAdd={this.handleAddTask}
            initialValues={editingTask}
            onUpdate={this.handleUpdateTask}
            onCancel={this.handleCancelEdit}
          />
          {todosList.length === 0 ? (
            <p className="empty-message">No tasks available. Please add a task.</p>
          ) : (
            <ul className="task-list">
              {todosList.map((eachTodo) => (
                <TaskItem
                  key={eachTodo.id}
                  todoDetails={eachTodo}
                  deleteTodo={this.deleteTodo}
                  onEdit={this.handleEdit}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Task;
