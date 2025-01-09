import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAdmin: false,
  isLoading: true,
  member: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload
      state.isLoading = false
    },
    userNotExists: (state) => {
      state.user = null
      state.isLoading = false
    },
    memberExists: (state, action) => {
      state.member = action.payload
    },
    memberNotExists: (state) => {
      state.member = null
    },
    adminExists: (state) => {
      state.isAdmin = true
      state.isLoading = false
    },
    adminNotExists: (state) => {
      state.isAdmin = false
      state.isLoading = false
    },
  },
})

export default authSlice
export const {
  userExists,
  userNotExists,
  memberExists,
  memberNotExists,
  adminExists,
  adminNotExists,
} = authSlice.actions
