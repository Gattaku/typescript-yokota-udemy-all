"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res
        .status(201)
        .json({ message: "TODOを作成しました。", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodo = (req, res, next) => {
    res.status(201).json({ message: "TODOを返信します。。", get: TODOS });
};
exports.getTodo = getTodo;
const updateTodo = (req, res, next) => {
    const id = req.params.id;
    const newText = req.body.text;
    console.log(newText);
    const index = TODOS.findIndex((elm) => elm.id === id);
    if (index < 0)
        throw new Error("IDが見つかりませんでした");
    TODOS[index] = new todo_1.Todo(id, newText);
    res
        .status(201)
        .json({ message: "TODOを1つ更新しました", updated: TODOS[index] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const index = TODOS.findIndex((elm) => elm.id === id);
    if (index < 0)
        throw new Error("IDが見つかりませんでした");
    const delted = TODOS.splice(index, 1);
    res
        .status(201)
        .json({ message: "TODOを1つ削除しました", deletedTod: delted });
};
exports.deleteTodo = deleteTodo;
