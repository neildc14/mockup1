const Todo = require("../models/TodoModel");
const mongoose = require("mongoose");

const getAllTodo = async (req, res) => {
  try {
    const all_todos = await Todo.find();

    if (all_todos.length === 0) {
      const error = { message: "No Todos found!" };
      throw error;
    }

    res.status(200).json(all_todos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;

  try {
    let error;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      error = { message: "Invalid ID" };
      throw error;
    }

    const todo = await Todo.findOne({ _id: id }).exec();

    if (!todo) {
      error = { message: "No todos found" };
      throw error;
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const postTodo = async (req, res) => {
  const { task, time } = req.body;
  try {
    const new_todo = await Todo.create({
      task,
      time,
    });

    let error;
    if (!new_todo) {
      error = { message: "Failed to create new todo" };
      throw error;
    }
    res.status(201).json(new_todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const putTodo = async (req, res) => {
  const { task, time } = req.body;
  const { id } = req.params;
  const filter = { _id: id };
  try {
    let error;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      error = { message: "Invalid ID" };
      throw error;
    }
    const updated_todo = await Todo.findOneAndUpdate(
      filter,
      { task, time },
      { new: true }
    );

    if (!updated_todo) {
      error = { message: "Failed to update todo" };
      throw error;
    }
    res.status(200).json(updated_todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    let error;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      error = { message: "Invalid ID" };
      throw error;
    }

    const deleted_todo = await Todo.findOneAndDelete({ _id: id });
    if (!deleted_todo) {
      error = { message: "Failed to deleted todo" };
      throw error;
    }
    res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllTodo, getTodo, postTodo, putTodo, deleteTodo };
