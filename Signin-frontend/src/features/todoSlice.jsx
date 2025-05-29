import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    list: [],
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    updateTodo: (state, action) => {
      const { index, text } = action.payload;
      state.list[index] = text;
    },
  },
});

export const { setList, addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
