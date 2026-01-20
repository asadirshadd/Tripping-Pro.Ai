import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/auth/AuthProvider';
import DefaultScreen from '../../screens/default/DefaultScreen';
import SignIn from '../../screens/auth/sign-in/SignIn';
import SignUp from '../../screens/auth/sign-up/SignUp';
import ForgotPassword from '../../screens/auth/forgot-password/ForgotPassword';
import DashboardContainer from '../../screens/dashboard/container/DashboardContainer';
import TermsCondition from '../../screens/dashboard/term&condition/TermsCondition';
import AboutUs from '../../screens/dashboard/about-us/AboutUs';

const Stack = createNativeStackNavigator();
export default function Navigation() {
  const {user, role} = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={
          user
            ? 'Dashboard'
            : 'DefaultScreen'
        }
        // initialRouteName={'Dashboard'}
      >
        {/*Auth*/}
        <Stack.Screen name={'DefaultScreen'} component={DefaultScreen} />
        <Stack.Screen name={'Login'} component={SignIn} />
        <Stack.Screen name={'Register'} component={SignUp} />
        <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
        {/*Dashboard*/}
        <Stack.Screen name={'Dashboard'} component={DashboardContainer} />
        {/*Menu*/}
        <Stack.Screen name={'TermsCondition'} component={TermsCondition} />
        <Stack.Screen name={'AboutUs'} component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
