// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  accountType: "athelete" | "organizer" | "judge" | "filmer" | "labeller" | undefined;
};

const initialState: AuthState = {
  isAuthenticated: false, // Default state (logged out)
  accountType: undefined, // Default state (no account type)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<
        "athelete" | "organizer" | "judge" | "filmer" | "labeller"
      >
    ) => {
      state.isAuthenticated = true;
      state.accountType = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accountType = undefined;
    },
  },
});

// Export actions
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
