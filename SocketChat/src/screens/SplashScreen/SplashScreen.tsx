import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {imageAssets} from '../../data/data';
import {RootStackParamsList} from '../../data/params';
import {gs} from '../../utils/globalstyles';

interface SplashScreenProps {
  navigation: StackNavigationProp<RootStackParamsList, 'SPLASH'>;
}

const SplashScreen: React.FunctionComponent<SplashScreenProps> = ({
  navigation,
}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LOGIN');
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
