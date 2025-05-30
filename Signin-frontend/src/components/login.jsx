import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import styled from 'styled-components';
import axiosInstance from "../utilites/axiosInstance";

const ContainerL=styled.div`
  text-align: center;
  min-width: 100vw;
  background-color:blue;
  min-height:100vh;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const HeadingL=styled.h1`
  color:white;
`
const FormL=styled.form`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LabelL=styled.label`
  font-weight:bold;
  color:white;
`

const InputL=styled.input`
  padding:10px;
  border-radius:5px;
  margin:10px;
`

const ButtonL=styled.button`
  background-color:white;
  color:black;
  border: 2px solid white;
  border-radius:5px;
  padding:10px;
  margin:10px;
`

const ParaL=styled.p`
  font-style: italic;
  font-size:25px;
  color:white;
`
const ErrorL=styled.p`
  font-size:30px;
  font-weight:bold;
  color:red;
`

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axiosInstance.post("/login", form);
      dispatch(login(res.data.token));
      navigate("/todoList");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status == "401") {
        setError("Invalid Credentials");
      } else if (error.response && error.response.status == "404") {
        setError("No user Found");
      } else {
        setError("Server Error");
      }
    }
  };
  const navigate = useNavigate();
  return (
    <ContainerL>
      <HeadingL>Login</HeadingL>
      <FormL onSubmit={handleSubmit}>
        <LabelL>Email </LabelL>
        <InputL
          type="email"
          value={form.email}
          placeholder="Enter Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <LabelL>Password</LabelL>
        <InputL
          type="password"
          value={form.password}
          placeholder="Enter Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <ButtonL type="submit">Submit</ButtonL>
        {error && <Error style={{ color: "red" }}>{error}</Error>}
      </FormL>
      <ParaL>You didn't have an account. Create new Account</ParaL>
      <ButtonL onClick={() => navigate("/register")}>New Account</ButtonL>
    </ContainerL>
  );
};

export default Login;
