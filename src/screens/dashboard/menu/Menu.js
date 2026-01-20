import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from '../../../styling/css/Style';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CommonActions} from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
export default function Menu({navigation}) {
  return (
    <>
      <View style={styles.auth_container}>
        <View style={styles.menu_topbar}>
          <TouchableOpacity
            style={styles.menu_topbar_btn_back}
            onPress={() => navigation.goBack()}>
            <Feather
              name={'chevron-left'}
              style={styles.menu_topbar_btn_back_icon}
            />
          </TouchableOpacity>
          <Text style={styles.menu_topbar_title}>Explore More</Text>
        </View>
        <View style={[styles.menu_body,{paddingBottom : 60,}]}>
          <ScrollView style={{flexGrow: 1}}>
            <TouchableOpacity style={styles.menu_item} onPress={()=> navigation.navigate("Profile")}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  name={'user-check'}
                  style={styles.menu_item_text_icon}
                />
                <Text style={styles.menu_item_text}>My Profile</Text>
              </View>
              <Feather name={'chevron-right'} style={styles.menu_item_icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu_item}
              onPress={() => Linking.openURL("https://google.com")}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name={'flight-takeoff'} style={styles.menu_item_text_icon} />
                <Text style={styles.menu_item_text}>Book Flights</Text>
              </View>
              <Feather name={'chevron-right'} style={styles.menu_item_icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu_item}
              onPress={() => Linking.openURL("https://google.com")}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name={'local-hotel'} style={styles.menu_item_text_icon} />
                <Text style={styles.menu_item_text}>Book Hotels</Text>
              </View>
              <Feather name={'chevron-right'} style={styles.menu_item_icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu_item}
              onPress={() => Linking.openURL("https://google.com")}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name={'directions-bus'} style={styles.menu_item_text_icon} />
                <Text style={styles.menu_item_text}>Book Buses</Text>
              </View>
              <Feather name={'chevron-right'} style={styles.menu_item_icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menu_item}
              onPress={() => navigation.navigate('AboutUs')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather name={'command'} style={styles.menu_item_text_icon} />
                <Text style={styles.menu_item_text}>About Us</Text>
              </View>
              <Feather name={'chevron-right'} style={styles.menu_item_icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menu_item}
              onPress={() => navigation.navigate('TermsCondition')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather name={'shield'} style={styles.menu_item_text_icon} />
                <Text style={styles.menu_item_text}>Terms & Condition</Text>
              </View>
              <Feather name={'chevron-right'} style={styles.menu_item_icon} />
            </TouchableOpacity>
            {/*Logout*/}
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                style={[styles.default_screen_btn, {marginTop: 10}]}
                onPress={async () => {

                  await AsyncStorage.removeItem("UserId")
                  await AsyncStorage.removeItem("Name")
                  await AsyncStorage.removeItem("Email")
                  await AsyncStorage.removeItem("Phone")
                  await AsyncStorage.removeItem("Address1")
                  await AsyncStorage.removeItem("Address2")
                  await AsyncStorage.removeItem("Role")
                  navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'DefaultScreen' }],
                      })
                  );
                }}>
                <Text style={styles.default_screen_btn_text}>Logout</Text>
              </TouchableOpacity>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity style={styles.social_btn} onPress={()=> Linking.openURL("https://facebook.com")}>
                  <Feather name={'facebook'} style={styles.social_btn_icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.social_btn} onPress={()=> Linking.openURL("https://instagram.com")}>
                  <Feather name={'instagram'} style={styles.social_btn_icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.social_btn} onPress={()=> Linking.openURL("https://linkedin.com")}>
                  <Feather name={'linkedin'} style={styles.social_btn_icon} />
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    </>
  );
}
