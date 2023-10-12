import React from "react";

interface todoAble {
  todos: { id: string; text: string }[];
  deleteHandle: (id: string) => void;
}

const TodoList: React.FC<todoAble> = (props) => {
  const { todos, deleteHandle } = props;
  const ckickHandle = (id: string) => {
    deleteHandle(id);
  };
  return (
    <ul>
      {todos.map((elm) => {
        return (
          <li key={elm.id}>
            <span>{elm.text}</span>
            <button onClick={() => ckickHandle(elm.id)}>削除</button>
            {/* <button onClick={props.deleteHandle.bind(null,elm.id)}>削除</button> //Udemy講座の中のやり方 */}
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
