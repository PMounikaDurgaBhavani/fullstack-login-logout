import React, { useState } from "react";
import "./todoList.css";
import { useNavigate } from "react-router-dom";
import { addTodo, deleteTodo } from "../features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

const TodoList = () => {
  const list = useSelector((state) => state.todo.list);
  const [text, setText] = useState("");
  const [showAll, setshowAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const displayList = showAll ? list : list.slice(0, 3);

  const addtext = () => {
    if (text.trim() !== "") {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const deleteItem = (index) => {
    dispatch(deleteTodo(index));
  };

  const unorderedlist = displayList.map((item, index) => (
    <li key={index}>
      {item}
      <button onClick={() => navigate(`/edit/${index}`)}>Edit</button>
      <button onClick={() => deleteItem(index)}>Delete</button>
    </li>
  ));

  const handlelogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <div className="logout">
        <button onClick={handlelogout}>Logout</button>
      </div>
      <div className="container">
        <h1>Todo List</h1>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={addtext} className="button">
          Add
        </button>
        <ul>{unorderedlist}</ul>
        {list.length > 3 && (
          <button onClick={() => setshowAll(!showAll)}>
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;
