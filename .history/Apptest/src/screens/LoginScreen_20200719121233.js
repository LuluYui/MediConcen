import React, { memo, useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View,FlatList, AsyncStorage } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [data, setData] = useState({data: []});

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    login();
    navigation.navigate('Dashboard');
  };

  _loadInitialState = async() => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      _onLoginPressed();
    }

  }

  login = () => {
    fetch('http://192.168.1.82:5000/users')
    .then(response => response.json())
    .then((json) => {

        if (json.success === true) {
          
        } else {
           alert('no matches');
        }
    })
    .catch((error) => {
      console.error(error);
    })
    .done();
  }  

  useEffect(() => {

    fetch('http://192.168.1.82:5000/users')
    .then(response => response.json())
    .then((json) => {
      setData({data: json});
      alert(JSON.stringify(data));
      return json;
    })
    .catch((error) => {
      console.error(error);
    });

  }, []);

  


  return (
    <Background>
      {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}
      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
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
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );

};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
