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
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
      state.isError = false; // 네트워크 요청이 시작되면 에러상태를 false로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isError = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
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
