// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserData, UserMetadata } from "@/types/types"

type AuthState = {
  isAuthenticated: boolean;
  isVerified: boolean;
  userMetadata: UserMetadata | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isVerified: false,
  userMetadata: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        isVerified: boolean;
        userMetadata: UserMetadata;
        isAuthenticated: boolean;
      }>
    ) => {
      state.isAuthenticated = true;
      state.isVerified = action.payload.isVerified
      state.userMetadata = action.payload.userMetadata;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userMetadata = null;
    },
  },
});


// Export actions
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
