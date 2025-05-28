import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmpassword) {
      return setError("Password does not match");
    }
    try {
      const res=await axios.post("http://localhost:5000/api/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem('token',res.data.token)
      setSuccess("Sign up successfully!");
      navigate("/todoList");
      setForm({ username: "", email: "", password: "", confirmpassword: "" });
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };
  return (
    <div style={{ textAlign: "center", minWidth: "100vw" }}>
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={form.username}
          placeholder="Enter Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <label>Email</label>
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
        <label>Confirm Password</label>
        <input
          type="password"
          value={form.confirmpassword}
          placeholder="Confirm Password"
          onChange={(e) =>
            setForm({ ...form, confirmpassword: e.target.value })
          }
          required
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default Register;
