import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  name: '',
  email: '',
  gender: '',
  age: 18,
  address: [],
  currentAddress: '',
  userId: '',
  uid: '',
};

// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },

    setEmail(state, action) {
      state.email = action.payload;
    },

    setGender(state, action) {
      state.gender = action.payload;
    },

    setAge(state, action) {
      state.age = action.payload;
    },

    setAddress(state, action) {
      state.address = action.payload;
    },

    setCurrentAddress(state, action) {
      state.currentAddress = action.payload;
    },

    setUserId(state, action) {
      state.userId = action.payload;
    },

    setUId(state, action) {
      state.uid = action.payload;
    },

    resetUser() {
      return initialState;
    },
  },
});

export const {
  setAddress,
  setName,
  setAge,
  setEmail,
  setGender,
  setCurrentAddress,
  setUserId,
  setUId,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
