import React, { memo, useState, useEffect } from "react";
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

const AddAppointment = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [clinicName, setClinic] = useState({ value: "", error: "" });
  const [phoneNum, setPhoneNum] = useState({ value: "", error: "" });
  const [address, setAddress] = useState({ value: "", error: "" });

  return (
    <Background>
      {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}

      <SafeAreaView style={styles.container}>
        <Header style={styles.header}>Add Appointment</Header>
        <View style={styles.textview}>
          <TextInput
            label="Name"
            returnKeyType="next"
            style={styles.textinput}
            value={name.value}
           
            error={!!name.error}
            errorText={name.error}
          />

          <TextInput
            label="Email"
            returnKeyType="next"
            style={styles.textinput}
            value={email.value}
            
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Password"
            returnKeyType="done"
            style={styles.textinput}
            value={password.value}
            
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <TextInput
            label="Confirm Password"
            returnKeyType="done"
            style={styles.textinput}
            value={confirmPassword.value}
          
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            secureTextEntry
          />

          <TextInput
            label="Clinic Name"
            returnKeyType="done"
            style={styles.textinput}
            value={clinicName.value}
          
            error={!!clinicName.error}
            errorText={clinicName.error}
          />

          <TextInput
            label="Phone Number"
            returnKeyType="done"
            style={styles.textinput}
            value={phoneNum.value}
            
            error={!!phoneNum.error}
            errorText={phoneNum.error}
          />
          <TextInput
            label="Address"
            returnKeyType="done"
            style={styles.textinput}
            value={address.value}
  
            error={!!address.error}
            errorText={address.error}
          />
        </View>
        <Button
          mode="contained"
          style={styles.button}
        >
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
};

const styles = StyleSheet.create({
  header: {
      flex:1,
      justifyContent: 'center',
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

export default memo(AddAppointment);
