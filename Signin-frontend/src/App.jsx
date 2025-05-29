import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/login";
import Register from "./components/register";
import TodoList from "./components/todoList";
import EditList from "./components/editList";
const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <TodoList /> : <Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/todoList" element={<TodoList />}></Route>
        <Route path="/edit/:id" element={<EditList />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
