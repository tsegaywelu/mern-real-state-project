import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
  //i will serialize my state
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
  }),
      
  
})