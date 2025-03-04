import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganizerHomeScreen from "../../dead project/Frontend/app/(tabs)/organizer/Home";
/*
import AthleteHomeScreen from "@screens/athlete/Home";
import JudgeHomeScreen from "@screens/judge/Home";
import FilmerHomeScreen from "@screens/filmer/Home";
import LabellerHomeScreen from "@screens/labeller/Home";
*/
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const accountType = useSelector((state: RootState) => state.auth.accountType);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accountType === "organizer" && (
        <Stack.Screen name='OrganizerHome' component={OrganizerHomeScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

/*

add these later

{accountType === "athlete" && (
        <Stack.Screen name='AthleteHome' component={AthleteHomeScreen} />
      )}
      {accountType === "judge" && (
        <Stack.Screen name='JudgeHome' component={JudgeHomeScreen} />
      )}
      {accountType === "filmer" && (
        <Stack.Screen name='FilmerHome' component={FilmerHomeScreen} />
      )}
      {accountType === "labeller" && (
        <Stack.Screen name='LabellerHome' component={LabellerHomeScreen} />
      )}

*/
