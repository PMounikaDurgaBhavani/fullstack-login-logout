import React, { useEffect, useState } from "react";
import "./todoList.css";
import { useNavigate } from "react-router-dom";
import { setList } from "../features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import axiosInstance from "../utilites/axiosInstance";

const TodoList = () => {
  const list = useSelector((state) => state.todo.list);
  const [text, setText] = useState("");
  const [showAll, setshowAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get("/tasks");
        dispatch(setList(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, [dispatch]);

  const displayList = showAll ? list : list.slice(0, 3);

  const addtext = async () => {
    if (text.trim() !== "") {
      try {
        const addTask = await axiosInstance.post("/tasks", { task: text });
        dispatch(setList([...list, addTask.data]));
        setText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      dispatch(setList(list.filter((task) => task.id !== id)));
    } catch (error) {
      console.log(error);
    }
  };

  const unorderedlist = displayList
    ?.filter((item) => item && item.id)
    .map((item) =>
      item ? (
        <li key={item.id}>
          {item.task}
          <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </li>
      ) : null
    );

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
          required
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
