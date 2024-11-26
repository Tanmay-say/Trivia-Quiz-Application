import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QuizProvider } from "./context/QuizContext";
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import ResultScreen from "./screens/ResultScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <QuizProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Quiz Setup" }}
          />
          <Stack.Screen
            name="QuizScreen"
            component={QuizScreen}
            options={{ title: "Quiz" }}
          />
          <Stack.Screen
            name="ResultScreen"
            component={ResultScreen}
            options={{ title: "Results" }}
          />
          <Stack.Screen
            name="LeaderboardScreen"
            component={LeaderboardScreen}
            options={{ title: "Leaderboard" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QuizProvider>
  );
}
