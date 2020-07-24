import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  AddAppointment
} from "./screens";
import AgendaScreen from './screens/Dashboard';

const Stack = createStackNavigator();

function createAppContainer() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
       <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
       <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
       <Stack.Screen
        name="Dashboard"
        component={AgendaScreen}
        options={{ title: 'Patient Calendar' }}
      />
      <Stack.Screen
        name="AddAppointment"
        component={AddAppointment}
        options={{ title: 'Appointment Add' }}
      />
    </Stack.Navigator>
  );
}

export default createAppContainer;
