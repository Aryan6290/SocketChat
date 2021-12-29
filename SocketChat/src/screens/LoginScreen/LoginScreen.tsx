import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {gs} from '../../utils/globalstyles';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  return (
    <SafeAreaView style={[gs.pageRoot, styles.centreContent]}></SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centreContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoginScreen;
