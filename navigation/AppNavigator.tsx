import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AuthNavigator from "./AuthStack";
import MainNavigator from "./MainStack";
import VerificationPage from "@/screens/Verification";

export default function AppNavigator() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const isVerified = useSelector((state: RootState) => state.auth.isVerified);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainNavigator />
      ) : isVerified ? (
        <AuthNavigator />
      ) : (
        <VerificationPage />
      )}
    </NavigationContainer>
  );
}
