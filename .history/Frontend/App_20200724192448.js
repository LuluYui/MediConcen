import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "./src/core/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./src/index";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
