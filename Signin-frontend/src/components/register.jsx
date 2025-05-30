import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import axiosInstance from "../utilites/axiosInstance";

const ContainerR=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  min-height:100vh;
  min-width:100vw;
  background-color:blue;
`
const HeadingR=styled.h1`
  font-weight:bold;
  margin:10px;
  color:white;
`

const FormR=styled.form`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LabelR=styled.label`
  font-weight:bold;
  color:white;
`

const InputR=styled.input`
  padding:10px;
  border-radius:5px;
  margin:10px;
`

const ButtonR=styled.button`
  background-color:white;
  color:black;
  border: 2px solid white;
  border-radius:5px;
  padding:10px;
  margin:10px;
`

const ErrorR=styled.p`
  font-size:30px;
  font-weight:bold;
  color:red;
`


const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmpassword) {
      return setError("Password does not match");
    }
    try {
      const res = await axiosInstance.post("/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      dispatch(login(res.data.token));
      navigate("/todoList");
      setForm({ username: "", email: "", password: "", confirmpassword: "" });
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        if (error.status == "401") {
          setError("Email already Exists");
        } else {
          setError("Something went wrong.");
        }
      }
    }
  };
  return (
    <ContainerR>
      <HeadingR>Register</HeadingR>
      <FormR onSubmit={handleSubmit}>
        <LabelR>Username</LabelR>
        <InputR
          type="text"
          value={form.username}
          placeholder="Enter Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <LabelR>Email</LabelR>
        <InputR
          type="email"
          value={form.email}
          placeholder="Enter Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <LabelR>Password</LabelR>
        <InputR
          type="password"
          value={form.password}
          placeholder="Enter Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <LabelR>Confirm Password</LabelR>
        <InputR
          type="password"
          value={form.confirmpassword}
          placeholder="Confirm Password"
          onChange={(e) =>
            setForm({ ...form, confirmpassword: e.target.value })
          }
          required
        />
        <ButtonR type="submit">Submit</ButtonR>
        {error && <Error style={{ color: "red" }}>{error}</Error>}
      </FormR>
    </ContainerR>
  );
};

export default Register;
