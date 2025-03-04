import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../../Frontend/app/screens/Login"; // Adjust path as needed

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='Login' component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
