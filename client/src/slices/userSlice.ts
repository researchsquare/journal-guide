import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk for API call
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: number, thunkAPI: any) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${userId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}, // Add normal reducers if needed
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchUser.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
