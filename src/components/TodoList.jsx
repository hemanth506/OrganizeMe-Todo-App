import React from "react";

function TodoList({ todoList, setTodoList }) {
  const deleteTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList([...newTodoList]);
  };

  const completeTask = (id) => {
    const UpdatedTodoList = [];
    todoList.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      UpdatedTodoList.push(todo);
    });
    setTodoList([...UpdatedTodoList]);
  };

  return (
    <div className="display-container">
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                className="inputCheckBox"
                type="checkbox"
                onClick={() => completeTask(todo.id)}
                id={todo.id}
              />
              <div className="todo-list-view">
                <p className={todo.isCompleted ? "todoParaStrike" : "todoPara"}>
                  {todo.value}
                </p>
                <button
                  className="deleteButton"
                  onClick={() => deleteTodo(todo.id)}
                >
                  X
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
