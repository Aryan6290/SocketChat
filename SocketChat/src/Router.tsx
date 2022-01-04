import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamsList} from './data/params';
import ChatScreen from './screens/ChatScreen/ChatScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignupScreen from './screens/SignUpScreen/SignupScreen';
import SplashScreen from './screens/SplashScreen/SplashScreen';

interface RouterProps {}

const Router: React.FC<RouterProps> = ({}) => {
  const Stack = createStackNavigator<RootStackParamsList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SPLASH">
        <Stack.Screen name="SPLASH" component={SplashScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="CHAT" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
