import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./todoList.css";
import axiosInstance from "../utilites/axiosInstance";
import { setList } from "../features/todoSlice";

const EditList = () => {
  const list = useSelector((state) => state.todo.list);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const taskItem = list.find((task) => task.id === parseInt(id));
  console.log(taskItem);
  const [text, setText] = useState(taskItem?.task || "");

  if (!taskItem) {
    return <p>Task not found</p>;
  }

  const updateTask = async () => {
    if (text.trim() === "") return;
    try {
      const res = await axiosInstance.put(`/tasks/${taskItem.id}`, {
        task: text,
      });
      const updatedList = list.map((item) =>
        item.id === taskItem.id ? res.data : item
      );
      dispatch(setList(updatedList));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div>
        <h2>Edit Task</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={updateTask}>Update</button>
        <button onClick={() => navigate("/")}>Cancle</button>
      </div>
    </div>
  );
};

export default EditList;
