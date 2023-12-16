import React, { useState, useEffect, useRef } from "react";
import TodoList from "./TodoList";

function Todo() {
  const localtodoItem = JSON.parse(localStorage.getItem("todoListItems")) || [];
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(localtodoItem);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todoListItems", JSON.stringify(todoList));
    inputRef.current?.focus();
  }, [todoList]);  

  const addTodo = () => {
    if (todo) {
      setTodoList([
        ...todoList,
        { id: Date.now(), value: todo, isCompleted: false },
      ]);
      setTodo("");
    }
  };

  return (
    <div className="container">
      <h1>Todos</h1>
      <div className="input-container">
        <input
          className="inputTodo"
          type="text"
          placeholder="Enter your todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          ref={inputRef}
        />
        <button className="todoButton" onClick={addTodo}>
          Add
        </button>
      </div>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

export default Todo;
