const express = require("express");
const router = express.Router();
const {
  getAllTodo,
  getTodo,
  postTodo,
  putTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getAllTodo);
router.post("/", postTodo);
router.get("/:id", getTodo);
router.put("/:id", putTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
