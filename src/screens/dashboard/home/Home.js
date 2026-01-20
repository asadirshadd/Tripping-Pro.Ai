import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles, {BOLD, MEDIUM} from '../../../styling/css/Style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useEffect, useState} from 'react';
import Loader from '../../../components/loader/Loader';
import {RFValue} from 'react-native-responsive-fontsize';
import {BLACK_3, WHITE} from '../../../styling/colors/Colors';
import Feather from 'react-native-vector-icons/Feather';

export default function Home({navigation}) {
  const [cardType, setCardType] = useState('mini');
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      title: 'Lahore to Karachi',
    },
    {
      id: 2,
      title: '3 day trip to Kashmir',
    },
    {
      id: 3,
      title: '5day tour to Murree',
    },
    {
      id: 4,
      title: 'Islamabad to swat',
    },
  ]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const RecentActivity = ({item}) => {
    return (
      <>
        <View style={styles.history_item}>
          <Image
            source={require('../../../assets/img/tour.png')}
            style={styles.history_item_img}
          />
          <Text style={styles.history_item_title}
                numberOfLines={1}
                ellipsizeMode={'tail'}
          >{item.title}</Text>
        </View>
      </>
    );
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === 'ios' ? 100 : 20}
        style={styles.container}>
        <ImageBackground
          source={require('../../../assets/img/dashboard.png')}
          style={{
            width: '100%',
            height: 300,
            position: 'relative',
          }}
          resizeMode={'cover'}>
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 30,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: RFValue(20),
                  color: WHITE,
                  textAlign: 'center',
                  fontFamily: BOLD,
                }}>
                I'm Tripping Pro!
              </Text>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: WHITE,
                  textAlign: 'center',
                  fontFamily: MEDIUM,
                }}>
                Your guide to stress-free travel
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.home_search_bar}>
          <View style={styles.home_search_bar_container}>
            <Feather name={'search'} style={styles.home_search_bar_icon} />
            <TextInput
              placeholder={'Ask anything'}
              placeholderTextColor={BLACK_3}
              style={styles.home_search_bar_input}
            />
          </View>
        </View>
        <View style={styles.page_body}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.page_body_subtitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.btn_link_text}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={historyData}
            keyExtractor={item => item.id}
            horizontal={true}
            renderItem={RecentActivity}
            style={{
              marginTop: 20,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
