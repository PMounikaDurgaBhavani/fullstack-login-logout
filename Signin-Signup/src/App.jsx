import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import TodoList from "./components/todoList";
import EditList from "./components/editList";
const App = () => {
  const [list,setList]=useState([])

  const getTocken=localStorage.getItem('token')
  console.log(getTocken);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={ getTocken ?<TodoList list={list} setList={setList} /> :   <Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/todoList" element={<TodoList list={list} setList={setList} />}></Route>
        <Route path="/edit/:id" element={<EditList list={list} setList={setList}/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
