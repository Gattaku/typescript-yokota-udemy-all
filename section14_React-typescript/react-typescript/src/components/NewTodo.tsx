import React, { useRef } from "react";

type newTodoProps = {
  onAddTodo: (todoText: string) => void;
};

const NewTodo: React.FC<newTodoProps> = (props) => {
  const inputTag = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // const formTag = event.target as HTMLFormElement;
    // const inputTag = formTag.querySelector("#todo-text")! as HTMLInputElement;
    // const inputText = inputTag.value;
    // console.log(inputText);
    const inputText = inputTag.current!.value;
    // console.log(inputText);
    props.onAddTodo(inputText);
    inputTag.current!.value = "";
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todo-text">Todo内容</label>
        <input type="text" id="todo-text" ref={inputTag} />
      </div>
      <button type="submit">TODO追加</button>
    </form>
  );
};

export default NewTodo;
