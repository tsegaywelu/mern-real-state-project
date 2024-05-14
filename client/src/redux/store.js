import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice'; // Correct import

export const store = configureStore({
  reducer: { user: userReducer }, // Corrected userReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
