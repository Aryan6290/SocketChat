import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {imageAssets} from '../../data/data';
import {RootStackParamsList} from '../../data/params';
import {initService} from '../../services/BaseServices';
import {gs} from '../../utils/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface SplashScreenProps {
  navigation: StackNavigationProp<RootStackParamsList, 'SPLASH'>;
}

const SplashScreen: React.FunctionComponent<SplashScreenProps> = ({
  navigation,
}) => {
  const navigateUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      initService(token);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HOME',
          },
        ],
      });
    } else {
      initService(null);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LOGIN',
          },
        ],
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      navigateUser();
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={[gs.pageRoot, styles.centreContent]}>
      <Image source={imageAssets.chat} style={{height: 120, width: 120}} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centreContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SplashScreen;
