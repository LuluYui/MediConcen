import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

default class LoginScreen extends React.Component {

  constructor(props) {

    super(props);
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [data, setData] = useState([]);
  

    const _onLoginPressed = () => {
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
  
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }
  
      fetchData = async() => {
        try {
          const response = await fetch('http://192.168.1.82:5000/user');
          const users = await response.json();  
          setData({data: users});
          return data;
        } catch (error) {
          console.error(error);
        }

      }

      useEffect(() => {
        fetch('https://reactnative.dev/movies.json')
          .then((response) => response.json())
          .then((json) => setData(json.movies))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);
      
      console.log(fetchData);
  
      navigation.navigate('Dashboard');
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  render() {
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
          onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  }
}

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
