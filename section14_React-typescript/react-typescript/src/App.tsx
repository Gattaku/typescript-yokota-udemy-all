import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: uuidv4(), text: "Typescriptコースの完了" },
  ]);

  // setCnt(cnt++);
  const todoAddHandler = (input: string) => {
    console.log(input);
    // const tempTodo = [...todos]; //set関数は非同期処理で行われるため、確実に前のデータが入っているかどうかは保証されない。
    // tempTodo.push({
    //   id: uuidv4(),
    //   text: input,
    // });
    // setTodos(tempTodo);
    setTodos((prevTodo) => [...prevTodo, { id: uuidv4(), text: input }]); //setTodosの引数を取ると、確実にそれが前の状態であることを保証。
    console.log(todos);
  };

  const deleteHandle = (id: string) => {
    console.log(id);
    const tenmpTodo = [...todos];
    const deletedTodo = tenmpTodo.filter((elm) => elm.id !== id);
    setTodos(deletedTodo);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todos={todos} deleteHandle={deleteHandle} />
    </div>
  );
};

export default App;
