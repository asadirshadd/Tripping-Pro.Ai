import React, {useCallback, useMemo, useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../home/Home';
import Menu from '../menu/Menu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PRIMARY, SECONDARY, WHITE} from '../../../styling/colors/Colors';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {REGULAR} from '../../../styling/css/Style';
import {useFocusEffect} from '@react-navigation/native';
import Chat from "../chat-bot/Chat";
import History from "../chat-bot/History";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FindFlightsScreen from '../find-flights/FindFlightsScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={'Home'} component={Home} />
    </HomeStack.Navigator>
  );
};

const ChatStack = createNativeStackNavigator();
const ChatStackScreens = () => {
  return (
    <ChatStack.Navigator screenOptions={{headerShown: false}}>
      <ChatStack.Screen
        name={'Chat'}
        component={Chat}
      />
      <ChatStack.Screen
        name={'ChatHistory'}
        component={History}
      />
    </ChatStack.Navigator>
  );
};

const MenuStack = createNativeStackNavigator();
const MenuStackScreens = () => {
  return (
    <MenuStack.Navigator screenOptions={{headerShown: false}}>
      <MenuStack.Screen name={'Menu'} component={Menu} />
    </MenuStack.Navigator>
  );
};

const DashboardContainer = ({navigation}) => {
  const [tabBarStyleOption, setTabBarStyleOption] = useState({
    left: 20,
    right: 20,
  });
  useFocusEffect(
    useCallback(() => {
      setTabBarStyleOption({
        left: 16,
        right: 16,
      });
    }, []),
  );

  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      activeColor="#fff"
      inactiveColor="rgba(255,255,255,0.5)"
      barStyle={{backgroundColor: PRIMARY}}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: PRIMARY,
          paddingVertical: 10,
          height: 60,
          borderRadius: 60,
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOpacity: 0.1,
          shadowRadius: 1,
          bottom: 5,
          right: tabBarStyleOption.right,
          left: tabBarStyleOption.left,
          paddingTop: 3,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: REGULAR,
          textTransform: 'uppercase',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
      }}>

      <Tab.Screen
        name="MainHome"
        component={HomeStackScreens}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({color}) => (
            <Feather name="home" size={26} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MainChat"
        component={ChatStackScreens}
        options={{
          tabBarLabel: 'AI Planner',
          tabBarIcon: ({color}) => (
            <Octicons name={'dependabot'} size={26} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MainMenu"
        component={MenuStackScreens}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="travel-explore" size={26} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="FindFlights"
        component={FindFlightsScreen}
        options={{
          tabBarLabel: 'Find Flights',
          tabBarIcon: ({color}) => (
            <Ionicons name="airplane-outline" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardContainer;
