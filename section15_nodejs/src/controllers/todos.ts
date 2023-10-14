import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);
  res
    .status(201)
    .json({ message: "TODOを作成しました。", createdTodo: newTodo });
};

export const getTodo: RequestHandler = (req, res, next) => {
  res.status(201).json({ message: "TODOを返信します。。", get: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const newText = (req.body as { text: string }).text;
  console.log(newText);
  const index = TODOS.findIndex((elm) => elm.id === id);

  if (index < 0) throw new Error("IDが見つかりませんでした");

  TODOS[index] = new Todo(id, newText);

  res
    .status(201)
    .json({ message: "TODOを1つ更新しました", updated: TODOS[index] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const index = TODOS.findIndex((elm) => elm.id === id);

  if (index < 0) throw new Error("IDが見つかりませんでした");

  const delted = TODOS.splice(index, 1);

  res
    .status(201)
    .json({ message: "TODOを1つ削除しました", deletedTod: delted });
};
