import Loader from '../../../components/loader/Loader';
import styles from '../../../styling/css/Style';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { BLACK_3 } from '../../../styling/colors/Colors';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../../firebase';  // ✅ Adjust if needed

export default function SignUp({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert('Missing Fields', 'Username, email and password are required.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Optionally update display name
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };


 return (
     <>
       {isLoading ? <Loader /> : null}
       <View style={styles.container}>
         <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
           <TouchableOpacity style={styles.btn_header_auth} onPress={() => navigation.goBack()}>
             <Feather name={'chevron-left'} style={styles.btn_header_auth_icon} />
           </TouchableOpacity>
           <View style={styles.auth_body}>
             <View>
               <Text style={styles.auth_body_title}>Register</Text>
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
                 placeholder={'Phone Number'}
                 placeholderTextColor={BLACK_3}
                 value={phone}
                 onChangeText={setPhone}
                 keyboardType={'number-pad'}
               />
             </View>
             <View style={styles.auth_input_container}>
               <TextInput
                 style={styles.auth_input}
                 placeholder={'Email'}
                 placeholderTextColor={BLACK_3}
                 value={email}
                 onChangeText={setEmail}
                 keyboardType={'email-address'}
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
                 onPress={() => setIsPassword(!isPassword)}
               >
                 <Feather
                   name={isPassword ? 'eye' : 'eye-off'}
                   style={styles.auth_input_button_icon}
                 />
               </TouchableOpacity>
             </View>
             <TouchableOpacity style={[styles.default_screen_btn, styles.mt_3]} onPress={handleSignUp}>
               <Text style={styles.default_screen_btn_text}>Create Account</Text>
             </TouchableOpacity>
             <View style={[styles.mv_3, { alignItems: 'center' }]}>
               <Text style={styles.text_regular}>Already have an account?</Text>
               <TouchableOpacity style={styles.btn_link} onPress={() => navigation.navigate('Login')}>
                 <Text style={styles.btn_link_text}>Tap here for Login</Text>
               </TouchableOpacity>
             </View>
           </View>
         </KeyboardAwareScrollView>
       </View>
     </>
   );
 }
