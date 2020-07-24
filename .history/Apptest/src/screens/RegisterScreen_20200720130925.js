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
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneValidator,
  confirmPasswordValidator,
  addressValidator,
  clinicValidator,
} from "../core/utils";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
  const [clinicName, setClinic] = useState({value: "", error: ""});
  const [phoneNum, setPhoneNum] = useState({value: "", error: ""});
  const [address, setAddress] = useState({value: "", error: ""});

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value, confirmPassword.value);
    const phoneError = phoneValidator(phoneNum.value);
    const confirmPasswordError = confirmPasswordValidator(confirmPassword.value, password.value);
    const clinicNameError = clinicValidator(clinicName.value);
    const addressError = addressValidator(address.value);

    if (emailError || passwordError || nameError || 
      phoneError || addressError || clinicNameError || confirmPasswordError ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({...confirmPassword, error: confirmPasswordError})
      setPhoneNum({ ...phoneNum, error: phoneError});
      setClinic({ ...clinicName, error: clinicNameError});
      setAddress({ ...address, error: addressError});

      return;
    } else {
      register();
    }
  };

  register = async() => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        clinicName: clinicName.value,
        phoneNum: phoneNum.value,
        address: address.value,
      })
    }

    try{
      const response = await fetch('http://192.168.1.82:5000/registration', options);
      const res = await response.json();
      if (res.success === true) {
        navigation.navigate('HomeScreen');
      } else {
        //alert("Registration Unsuccessful, re-check all inputs");
        
      }
    } catch {
      console.error();
    }
  }  


  useEffect(() => {
    
  }, []);


  return (
    <Background>
      {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}
      
      <SafeAreaView style={styles.container}>
        <Header style={styles.header}>Create Account</Header>
        <View style={styles.textview}> 
        <TextInput
          label="Name"
          returnKeyType="next"
          style={styles.textinput}
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          style={styles.textinput}
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
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
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          style={styles.textinput}
          value={confirmPassword.value}
          onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry
        />

        <TextInput
          label="Clinic Name"
          returnKeyType="done"
          style={styles.textinput}
          value={clinicName.value}
          onChangeText={(text) => setClinic({ value: text, error: "" })}
          error={!!clinicName.error}
          errorText={clinicName.error}
        />

        <TextInput
          label="Phone Number"
          returnKeyType="done"
          style={styles.textinput}
          value={phoneNum.value}
          onChangeText={(text) => setPhoneNum({ value: text, error: "" })}
          error={!!phoneNum.error}
          errorText={phoneNum.error}
        />
        <TextInput
          label="Address"
          returnKeyType="done"
          style={styles.textinput}
          value={address.value}
          onChangeText={(text) => setAddress({ value: text, error: "" })}
          error={!!address.error}
          errorText={address.error}
        />
         </View>
        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Sign Up
        </Button>

        <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      
      </SafeAreaView>

      
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: "flex-start",
    justifyContent: "center",
    width: "100%",
  },
  textview: {
    flex:1,
 },
  textinput: { 
    marginTop: -26,
    height:38
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
    alignContent: 'flex-start'
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
 
});

export default memo(RegisterScreen);
