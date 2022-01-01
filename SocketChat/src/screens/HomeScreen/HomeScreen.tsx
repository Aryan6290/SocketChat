import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {gs} from '../../utils/globalstyles';

interface HomeScreenProps {}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = () => {
  return <SafeAreaView style={gs.pageRoot}></SafeAreaView>;
};

export default HomeScreen;
