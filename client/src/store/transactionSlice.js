import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue('Authentication required');
      }

      const response = await axios.get(`${API_URL}/transactions`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return []; // Return empty array if no transactions found
      }
      return rejectWithValue(
        error.response?.data?.message || 
        'Error connecting to server'
      );
    }
  }
);

export const addTransactions = createAsyncThunk(
  'transactions/addTransactions',
  async (transactions, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      // Log the data being sent
      console.log('Sending to backend:', { transactions });

      const response = await axios.post(
        `${API_URL}/transactions/bulk`,
        { transactions }, // Ensure data is wrapped in an object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Log successful response
      console.log('Backend response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Add transactions error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to add transactions'
      );
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearTransactions: (state) => {
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.items = []; // Clear items on error
      })
      .addCase(addTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add new transactions to the top of the list
        state.items = [...action.payload, ...state.items];
        state.error = null;
      })
      .addCase(addTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;