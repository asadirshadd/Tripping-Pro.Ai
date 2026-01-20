import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../../styling/css/Style';
import {PRIMARY} from '../../styling/colors/Colors';
import Loader from '../../components/loader/Loader';
import {useEffect, useState} from 'react';

export default function DefaultScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoading ? <Loader /> : null}
      {/*<StatusBar barStyle="dark-content" backgroundColor={PRIMARY} />*/}
      <View style={[styles.auth_container]}>
        <View style={styles.default_screen_header_container}>
          <ImageBackground source={require('../../assets/img/logo_bg.png')} style={styles.default_screen_header}>
            <Image
              source={require('../../assets/img/favicon.png')}
              style={styles.default_screen_header_img}
            />
          </ImageBackground>
          <Text style={styles.default_screen_title}>
            Get Started
          </Text>
          <Text style={styles.default_screen_subtitle}>
            Ready to explore smarter? Let AI plan your perfect trip, tailored just for you.
            Tap below to start your adventure!
          </Text>
        </View>

        <View style={styles.default_screen_body}>
          <TouchableOpacity
            style={[styles.default_screen_btn, styles.default_screen_btn1]}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.default_screen_btn_text}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.default_screen_btn, styles.default_screen_btn2]}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={[styles.default_screen_btn_text,styles.default_screen_btn2_text]}>Create My Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
