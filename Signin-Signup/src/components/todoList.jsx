import React, { useState } from "react";
import "./todoList.css";
import { useNavigate } from "react-router-dom";

const TodoList = ({ list, setList }) => {
  const [text, setText] = useState("");
  const [showAll, setshowAll] = useState(false);
  const navigate = useNavigate();

  const displayList = showAll ? list : list.slice(0, 3);

  const addtext = () => {
    if (text.trim() !== "") {
      setList([...list, text]);
      setText("");
    }
  };

  const deleteItem = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const unorderedlist = displayList.map((item, index) => (
    <li key={index}>
      {item}
      <button onClick={() => navigate(`/edit/${index}`)}>Edit</button>
      <button onClick={() => deleteItem(index)}>Delete</button>
    </li>
  ));

  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

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
