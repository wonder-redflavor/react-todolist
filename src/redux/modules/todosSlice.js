import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      //   console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //   console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addTodo = createAsyncThunk(
  "todos/addTodo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/todos", {
        id: uuidv4(),
        title: payload.title,
        contents: payload.contents,
        isDone: false,
        isUpdate: false,
      });
      //   console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //   console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(`http://localhost:3001/todos/${payload}`);
      //   console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //   console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __switchTodo = createAsyncThunk(
  "todos/switchTodo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(
        `http://localhost:3001/todos/${payload.id}`,
        {
          isDone: payload.isDone,
        }
      );
      //   console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //   console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true; // ???????????? ????????? ???????????? ??????????????? true??? ???????????????.
      state.isError = false; // ???????????? ????????? ???????????? ??????????????? false??? ???????????????.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // ???????????? ????????? ????????????, false??? ???????????????.
      state.isError = false; // ???????????? ????????? ????????????, false??? ???????????????.
      state.todos = action.payload; // Store??? ?????? todos??? ???????????? ????????? todos??? ????????????.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // ???????????? ????????? ????????????, false??? ???????????????.
      state.isLoading = false; // ????????? ???????????????, ???????????? ????????? ????????????, false??? ???????????????.
      state.error = action.payload; // catch ??? error ????????? state.error??? ????????????.
    },

    [__addTodo.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = [...state.todos, action.payload];
    },
    [__addTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLoading = false;
      state.error = action.payload;
    },
  },

  [__deleteTodo.pending]: (state) => {
    state.isLoading = true;
    state.isError = false;
  },
  [__deleteTodo.fulfilled]: (state, action) => {
    state.isLoading = false;
    state.isError = false;
    const result = state.todos.filter((todo) => todo.id !== action.payload);
    state.todos = result;
  },
  [__deleteTodo.rejected]: (state, action) => {
    state.isLoading = false;
    state.isLoading = false;
    state.error = action.payload;
  },

  [__switchTodo.pending]: (state) => {
    state.isLoading = true;
    state.isError = false;
  },
  [__switchTodo.fulfilled]: (state, action) => {
    state.isLoading = false;
    state.isError = false;
    const result = state.todos.map((todo) => {
      if (todo.id === action.payload.id) {
        return action.payload;
      } else {
        return todo;
      }
    });
    state.todos = result;
  },
  [__switchTodo.rejected]: (state, action) => {
    state.isLoading = false;
    state.isLoading = false;
    state.error = action.payload;
  },
});
// const todosSlice = createSlice({
//   name: "todos",
//   initialState: {},
//   reducers: {},
// });

// // export
export default todosSlice.reducer;
