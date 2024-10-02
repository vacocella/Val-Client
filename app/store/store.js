import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataslice'; 
import playerReducer from './playerSlice';

export const store = configureStore({
  reducer: {
    counter: dataSlice,
    players: playerReducer
  },
});
