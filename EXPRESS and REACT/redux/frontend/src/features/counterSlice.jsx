import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //slice has reducer and actions in one file and state as well asynchronous actions are created using createAsyncThunk which generates pending, fulfilled and rejected action types for us
import axios from "axios";
const API = "http://localhost:5000";
// get counter from backend
export const fetchCounter = createAsyncThunk(
  "counter/fetchCounter",
  async () => {
    const res = await axios.get(`${API}/counter`);
    return res.data.value;
  },
);
// increment
export const incrementCounter = createAsyncThunk(
  "counter/incrementCounter",
  async () => {
    const res = await axios.post(`${API}/increment`);
    return res.data.value;
  },
);
// decrement
export const decrementCounter = createAsyncThunk(
  "counter/decrementCounter",
  async () => {
    const res = await axios.post(`${API}/decrement`);
    return res.data.value;
  },
);
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounter.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(incrementCounter.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(decrementCounter.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});
export default counterSlice.reducer;
