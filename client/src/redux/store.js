import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducer/auth'
import api from './query/api'
import miscSlice from './reducer/misc'

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
})

export default store
