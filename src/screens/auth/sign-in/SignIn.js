import Loader from '../../../components/loader/Loader';
import styles from '../../../styling/css/Style';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { BLACK_3 } from '../../../styling/colors/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase';  // Make sure this path is correct!

export default function SignIn({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigation.navigate("Dashboard");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <TouchableOpacity style={styles.btn_header_auth} onPress={()=> navigation.goBack()}>
            <Feather
              name={'chevron-left'}
              style={styles.btn_header_auth_icon}
            />
          </TouchableOpacity>
          <View style={styles.auth_body}>
            <View>
              <Text style={styles.auth_body_title}>Login</Text>
            </View>
            <View style={styles.auth_input_container}>
              <TextInput
                style={styles.auth_input}
                placeholder={'Username'}
                placeholderTextColor={BLACK_3}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.auth_input_container}>
              <TextInput
                style={styles.auth_input}
                placeholder={'Password'}
                placeholderTextColor={BLACK_3}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={isPassword}
              />
              <TouchableOpacity
                style={styles.auth_input_button}
                onPress={() => setIsPassword(!isPassword)}>
                <Feather
                  name={isPassword ? 'eye' : 'eye-off'}
                  style={styles.auth_input_button_icon}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.default_screen_btn,styles.mt_3]} onPress={handleLogin}>
              <Text style={styles.default_screen_btn_text}>Login</Text>
            </TouchableOpacity>
            <View style={[styles.mv_3,{alignItems : "center"}]}>
              <Text style={styles.text_regular}>Did you forgot your password?</Text>
              <TouchableOpacity style={styles.btn_link} onPress={()=> navigation.navigate("ForgotPassword")}>
                <Text style={styles.btn_link_text}>Tap here for reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
