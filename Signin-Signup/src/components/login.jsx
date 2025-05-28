import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error,setError]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/todoList");
    } catch (error) {
      console.log(error);
      if(error.response && error.response.status=='401'){
        setError("Invalid Credentials");
      }else if(error.response && error.response.status=='404'){
        setError("No user Found");
      }
      else{
        setError("Server Error");
      }
    }
  };
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", minWidth: "100vw" }}>
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Email </label>
        <input
          type="email"
          value={form.email}
          placeholder="Enter Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          placeholder="Enter Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
      <p>You didn't have an account. Create new Account</p>
      <button onClick={() => navigate("/register")}>New Account</button>
    </div>
  );
};

export default Login;
