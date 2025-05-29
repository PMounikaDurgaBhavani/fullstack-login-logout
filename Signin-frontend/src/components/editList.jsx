import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./todoList.css";
import { updateTodo } from "../features/todoSlice";

const EditList = () => {
  const list = useSelector((state) => state.todo.list);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const index = parseInt(id);
  const [text, setText] = useState(list[index] || "");

  const updateTask = () => {
    if (text.trim() !== "") {
      dispatch(updateTodo({ index, text }));
    }
    navigate("/");
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
