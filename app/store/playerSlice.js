import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  players: [],
  loading: false,
  error: null,
};

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    fetchPlayersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPlayersSuccess: (state, action) => {
      state.loading = false;
      state.players = action.payload;
    },
    fetchPlayersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPlayersStart,
  fetchPlayersSuccess,
  fetchPlayersFailure,
} = playerSlice.actions;

// Asynchronous thunk action for fetching player data
export const fetchPlayers = () => async (dispatch) => {
  dispatch(fetchPlayersStart());
  try {
    const response = await axios.get('/api/players'); // Correct API path
    dispatch(fetchPlayersSuccess(response.data));
  } catch (error) {
    dispatch(fetchPlayersFailure(error.message));
  }
};

export default playerSlice.reducer;