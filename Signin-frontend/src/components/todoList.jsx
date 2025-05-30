import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { setList } from "../features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import axiosInstance from "../utilites/axiosInstance";

const ContainerT=styled.div`
text-align: center;
  min-width: 100vw;
  background-color:blue;
  min-height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
`
const NavT=styled.div`
  text-align:end;
`

const TodoContainerT=styled.div`
  padding:10px;
  display:flex;
  flex-direction:column;
  align-items:center;
`
const ButtonT=styled.button`
  background-color:white;
  color:black;
  border: 2px solid white;
  border-radius:5px;
  padding:10px;
  margin:20px;
`

const ListConT=styled.li`
  list-style-type:none;
  border: 2px solid white;
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
const DivT=styled.div`
  padding:1px;
`
const InputT=styled.input`
  padding:15px;
  border-radius:5px;
  margin:10px;
  border-width:0px;
  width:50vw;
  font-size:15px;
`
const HeadingT=styled.h1`
  color:white;
`


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
        <ListConT key={item.id}>
          {item.task}
          <DivT>
            <ButtonT onClick={() => navigate(`/edit/${item.id}`)}>Edit</ButtonT>
            <ButtonT onClick={() => deleteItem(item.id)}>Delete</ButtonT>
          </DivT>
        </ListConT>
      ) : null
    );

  const handlelogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <ContainerT>
      <NavT>
        <ButtonT onClick={handlelogout}>Logout</ButtonT>
      </NavT>
      <TodoContainerT>
        <HeadingT>Todo List</HeadingT>
        <InputT
          type="text"
          value={text}
          required
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <ButtonT onClick={addtext}>
          Add
        </ButtonT>
        <ul>{unorderedlist}</ul>
        {list.length > 3 && (
          <ButtonT onClick={() => setshowAll(!showAll)}>
            {showAll ? "Show Less" : "Show More"}
          </ButtonT>
        )}
      </TodoContainerT>
    </ContainerT>
  );
};

export default TodoList;
