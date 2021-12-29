import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamsList} from './data/params';
import LoginScreen from './screens/LoginScreen/LoginScreen';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
