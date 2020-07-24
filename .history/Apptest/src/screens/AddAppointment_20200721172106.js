import React, { memo, useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";

export default class AddAppointment extends Component {

  render() {

    return (
      <Background>
        {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}

        <SafeAreaView style={styles.container}>
          <Header style={styles.header}>Add Appointment</Header>
          <View style={styles.textview}>
            <TextInput
              label="Patient Name"
              returnKeyType="next"
              style={styles.textinput}
            
            />

            <TextInput
              label="Doctor Name"
              returnKeyType="next"
              style={styles.textinput}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />

            <TextInput
              label="Diagnosis"
              returnKeyType="done"
              style={styles.textinput}
            
              secureTextEntry
            />

            <TextInput
              label="Medication"
              returnKeyType="done"
              style={styles.textinput}
              
              secureTextEntry
            />

            <TextInput
              label="Fee"
              returnKeyType="done"
              style={styles.textinput}
             
            />

            <TextInput
              label="Date"
              returnKeyType="done"
              style={styles.textinput}
             
            />
            <TextInput
              label="Follow Up"
              returnKeyType="done"
              style={styles.textinput}
            />
            <TextInput
              label="Remarks"
              returnKeyType="done"
              style={styles.textinput}
            />
          </View>
          <Button mode="contained" style={styles.button}>
            Sign Up
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Already have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
  },
  container: {
    flex: 1,
    flexDirection: "column",

    width: "100%",
  },
  textview: {
    flex: 1,
  },
  textinput: {
    marginTop: -26,
    height: 38,
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    marginTop: 1,
    alignContent: "flex-start",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
