import React, { useState } from "react";
import todoStyles from './Todo.module.css';
import appStyles from './App.module.css';

// Todo component
function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className={todoStyles.stackSmall} onSubmit={handleSubmit}>
      <div className={todoStyles.formGroup}>
        <label className={todoStyles.todoLabel} htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className={todoStyles.todoText}
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className={todoStyles.btnGroup}>
        <button
          type="button"
          className={todoStyles.todoCancel}
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className={todoStyles.visuallyHidden}>renaming {props.name}</span>
        </button>
        <button type="submit" className={`${todoStyles.btn} ${todoStyles.btnPrimary}`}>
          Save
          <span className={todoStyles.visuallyHidden}>new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className={todoStyles.stackSmall}>
      <div className={todoStyles.cCb}>
        <input
          id={props.id}
          type="checkbox"
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className={todoStyles.todoLabel} htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className={todoStyles.btnGroup}>
        <button
          type="button"
          className={todoStyles.btn}
          onClick={() => setEditing(true)}
        >
          Edit <span className={todoStyles.visuallyHidden}>{props.name}</span>
        </button>
        <button
          type="button"
          className={`${todoStyles.btn} ${todoStyles.btnDanger}`}
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className={todoStyles.visuallyHidden}>{props.name}</span>
        </button>
      </div>
    </div>
  );

  const todoClassName = props.completed 
    ? `${todoStyles.todo} ${todoStyles.todoCompleted}`
    : todoStyles.todo;

  return <li className={todoClassName}>{isEditing ? editingTemplate : viewTemplate}</li>;
}

// App component
function App() {
  const [tasks, setTasks] = useState([
    { id: "task-1", name: "Buy groceries", completed: false },
    { id: "task-2", name: "Walk the dog", completed: true },
    { id: "task-3", name: "Do laundry", completed: false },
  ]);

  // Toggle task completed
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Delete task
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  // Edit task
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // Add new task
  function addTask(name) {
    const newTask = {
      id: `task-${tasks.length + 1}`,
      name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  const taskList = tasks.map(task => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const [newTaskName, setNewTaskName] = useState("");
  function handleNewTaskChange(e) {
    setNewTaskName(e.target.value);
  }
  function handleNewTaskSubmit(e) {
    e.preventDefault();
    if (newTaskName.trim() !== "") {
      addTask(newTaskName.trim());
      setNewTaskName("");
    }
  }

  return (
    <div className={appStyles.todoapp}>
      <div className={appStyles.stackLarge}>
        <h1>Todo List</h1>
        <form onSubmit={handleNewTaskSubmit}>
          <input
            type="text"
            id="new-todo-input"
            className={appStyles.input}
            name="text"
            autoComplete="off"
            value={newTaskName}
            onChange={handleNewTaskChange}
            placeholder="What needs to be done?"
          />
          <button type="submit" className={`${appStyles.btn} ${appStyles.btnPrimary} ${appStyles.btnLg}`}>
            Add Task
          </button>
        </form>
        <h2 id="list-heading">Tasks</h2>
        <ul
          role="list"
          className={`${appStyles.todoList} ${appStyles.stackException}`}
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
    </div>
  );
}

export default App;
