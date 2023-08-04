import React, { useState } from "react";
import "./TodoForm.css";
import { GrClose } from "react-icons/gr";

const TodoForm = () => {
  const [input, setInput] = useState({
    inputText: "",
    completed: false,
    id: "",
  });
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prev) => {
      return [...prev, input];
    });
    setFilterTodos((prev) => {
      return [...prev, input];
    });
    setInput((prev) => {
      return { ...prev, inputText: "" };
    });
  };
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, inputText: e.target.value, id: Math.random() };
    });
  };
  const handleComplete = (id) => {
    const foundIndex = todos.findIndex((todo) => todo.id === id);
    const updated = [...todos];
    updated[foundIndex].completed = !updated[foundIndex].completed;
    setFilterTodos(updated);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setFilterTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleFilter = (e) => {
    const { name } = e.target;
    const originalTodos = [...todos];
    const completed = todos.filter((todo) => todo.completed === true);
    const uncompleted = todos.filter((todo) => todo.completed === false);
    switch (name) {
      case "all":
        {
          setFilterTodos(originalTodos);
        }
        break;
      case "completed":
        // {
        //   completed.length > 0 ?  : setFilterTodos([]);
        // }
        setFilterTodos(completed);
        break;
      case "uncompleted":
        // uncompleted.length > 0
        //   ?
        //   : setFilterTodos([]);
        setFilterTodos(uncompleted);
        break;
      default:
        setFilterTodos(originalTodos);
    }
  };
  return (
    <>
      <div className="form-filter__container">
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a todo"
            className="todo-input"
            value={input.inputText}
            onChange={handleChange}
          />
          <button className="todo-button" type="submit">
            {" "}
            Add todo
          </button>
        </form>
        {todos.length > 0 ? (
          <div className="select">
            <button
              type="button"
              name="all"
              value="all"
              // className={`filter-button ${isClicked === "all" ? "active" : ""}`}
              key="button1"
              onClick={handleFilter}
            >
              {" "}
              All
            </button>
            <button
              type="button"
              name="completed"
              onClick={handleFilter}
              // className={`filter-button ${
              //   isClicked === "completed" ? "active" : ""
              // }`}
            >
              {" "}
              Completed
            </button>
            <button
              type="button"
              name="uncompleted"
              onClick={handleFilter}
              // className={`filter-button ${
              //   isClicked === "uncompleted" ? "active" : ""
              // }`}
            >
              {" "}
              Uncompleted
            </button>
          </div>
        ) : (
          <p>Add a new todo to start planning today 🚀</p>
        )}
      </div>
      {filterTodos.length > 0
        ? filterTodos.map((todo) => {
            return (
              <div className="todo-container" key={todo.id}>
                <ul className="todo-list">
                  <div
                    className={
                      todo.completed ? "todo-row completed" : "todo-row"
                    }
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      value={todo.completed}
                      onChange={() => handleComplete(todo.id)}
                    />
                    <li className="todo-item">{todo.inputText}</li>
                    <GrClose onClick={() => handleDelete(todo.id)} />
                  </div>
                </ul>
              </div>
            );
          })
        : ""}
    </>
  );
};

export default TodoForm;
