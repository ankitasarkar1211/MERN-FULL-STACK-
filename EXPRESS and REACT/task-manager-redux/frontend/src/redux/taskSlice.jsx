import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //createSlice is used to create a slice of the Redux store, and createAsyncThunk is used to handle asynchronous actions like API calls
import axios from "axios"; // Axios is used for making HTTP requests to the backend API

const API = "http://localhost:5000/api/tasks";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
    const res = await axios.get(API);
    return res.data;
});

export const addTask = createAsyncThunk("tasks/add", async (task) => {
    const res = await axios.post(API, task);
    return res.data;
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
});

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
      tasks: []
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
        });

        builder.addCase(addTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload);
        });

        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter(
                task => task._id !== action.payload
            );
        });
    }
});

export default taskSlice.reducer;