"use strict";
// const express = require("express");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/todos", todos_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get("/", (req, res) => {
    res.send("Hello typescript nodejs");
});
app.listen(3000, () => {
    console.log("server is running");
});