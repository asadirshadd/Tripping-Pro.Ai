import Loader from '../../../components/loader/Loader';
import styles from '../../../styling/css/Style';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {BLACK_3} from '../../../styling/colors/Colors';

export default function ForgotPassword({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
              <Text style={styles.auth_body_title}>Forgot Password</Text>
            </View>
            <View style={styles.auth_input_container}>
              <TextInput
                style={styles.auth_input}
                placeholder={'Email Address'}
                placeholderTextColor={BLACK_3}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <TouchableOpacity style={[styles.default_screen_btn,styles.mt_3]}>
              <Text style={styles.default_screen_btn_text}>Reset Password</Text>
            </TouchableOpacity>
            <View style={[styles.mv_3,{alignItems : "center"}]}>
              <Text style={styles.text_regular}>Already have an account?</Text>
              <TouchableOpacity style={styles.btn_link} onPress={()=> navigation.navigate("Login")}>
                <Text style={styles.btn_link_text}>Tap here to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
