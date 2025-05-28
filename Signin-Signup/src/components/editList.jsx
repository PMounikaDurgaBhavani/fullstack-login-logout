import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./todoList.css";

const EditList = ({ list, setList }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const index = parseInt(id);
  const [text, setText] = useState(list[index] || "");

  const updateTask = () => {
    const updated = [...list];
    updated[index] = text;
    setList(updated);
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
