const { Task } = require("../models");

const postTask = async (req, res) => {
  try {
    const { task } = req.body;
    const result = await Task.create({
      task,
      userId: req.user.id,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error Occurred");
  }
};

const getTask = async (req, res) => {
  try {
    const result = await Task.findAll({ where: { userId: req.user.id } });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error Occurred");
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }
    await result.destroy();
    res.status(201).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error Occurred");
  }
};

const updateTask = async (req, res) => {
  try {
    const result = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!result) {
      return res.status(404).json({ message: "Task not Found" });
    }
    result.task = req.body.task;
    await result.save();
    res.status(201).json({ message: "Updated Successfully", task: result });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error Occurred");
  }
};

module.exports = { postTask, getTask, deleteTask, updateTask };
