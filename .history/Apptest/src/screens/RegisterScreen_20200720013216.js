import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../core/utils";
import { ScrollView } from "react-native-gesture-handler";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate("Dashboard");
  };

  return (
    <Background>
      {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview}>
        <Header style={styles.header}>Create Account</Header>
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
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <TextInput
          label="Clinic Name"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <TextInput
          label="Phone Number"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          label="Address"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Sign Up
        </Button>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignContent: "flex-start",
  },
  scrollview: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },
  textinput: { 
    height: 30,
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 0,
  },
  row: {
    flexDirection: "row",
    marginTop: 0,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
 
});

export default memo(RegisterScreen);
