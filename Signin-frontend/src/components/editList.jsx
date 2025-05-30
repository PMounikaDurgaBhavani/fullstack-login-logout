import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axiosInstance from "../utilites/axiosInstance";
import { setList } from "../features/todoSlice";

const EditList = () => {
  const list = useSelector((state) => state.todo.list);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const taskItem = list.find((task) => task.id === parseInt(id));
  console.log(taskItem);
  const [text, setText] = useState(taskItem?.task || "");

  const Container=styled.div`
  min-width: 100vw;
  background-color:blue;
  min-height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const Input=styled.input`
width:50vw;
  padding:15px;
  border-radius:5px;
  margin:10px;
  border-width:0px;
  font-size:15px;
`
const Heading=styled.h1`
  color:white;
`
const Button=styled.button`
  background-color:white;
  color:black;
  border: 2px solid white;
  border-radius:5px;
  padding:10px;
  margin:20px;
`
 
const Div=styled.div`
  color:white;
  border-radius:5px;
  margin:10px;
  width:65vw;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  padding-left:10px;
`
const P=styled.p`
  align-items:center;
`
  if (!taskItem) {
    return <P>Task not found</P>;
  }

  const updateTask = async () => {
    if (text.trim() === "") return;
    try {
      const res = await axiosInstance.put(`/tasks/${taskItem.id}`, {
        task: text,
      });
      const updatedList = list.map((item) =>
        item.id === taskItem.id ? res.data : item
      );
      dispatch(setList(updatedList));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Heading>Edit Task</Heading>
      <Div>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={updateTask}>Update</Button>
        <Button onClick={() => navigate("/")}>Cancle</Button>
      </Div>
    </Container>
  );
};

export default EditList;
