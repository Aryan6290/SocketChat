/* eslint-disable react-hooks/exhaustive-deps */
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OutlineBoxTextfieldComponent from '../../components/CustomMaterialTextField/OutlineMaterialTextField';
import {COLORS, imageAssets} from '../../data/data';
import {RootStackParamsList} from '../../data/params';
import {loginUser} from '../../services/LoginServices';
import {gs} from '../../utils/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../utils/showToast';
import {initService} from '../../services/BaseServices';

interface LoginScreenProps {
  navigation: StackNavigationProp<RootStackParamsList, 'LOGIN'>;
  route: RouteProp<RootStackParamsList, 'LOGIN'>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onButtonPress = async () => {
    try {
      const res = await loginUser(email, password);
      if (res.status === 200) {
        console.log(res.data.token);
        await initService(res.data.token);
        await AsyncStorage.setItem('token', res.data.token);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'SIGNUP',
            },
          ],
        });
      } else {
        showToast('Failed to login user! Check Internet or Try again!');
      }
    } catch (error: any) {
      showToast(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <SafeAreaView style={[gs.pageRoot, styles.centreContent]}>
      <Image
        source={imageAssets.chat}
        style={{height: 120, width: 120, marginBottom: 40}}
      />
      <OutlineBoxTextfieldComponent
        style={{alignSelf: 'stretch', marginHorizontal: 16, marginVertical: 10}}
        label="Email"
        onChangeText={setEmail}
        textValue={email}
      />
      <OutlineBoxTextfieldComponent
        style={{alignSelf: 'stretch', marginHorizontal: 16, marginVertical: 10}}
        label="Password"
        onChangeText={setPassword}
        textValue={password}
      />
      <Pressable
        onPress={onButtonPress}
        android_ripple={{color: '#0000001a'}}
        style={[styles.centreContent, styles.btnStyle]}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          Login
        </Text>
      </Pressable>
      <View style={styles.signupRowStyle}>
        <Text style={{color: '#616161', fontSize: 18, fontWeight: 'bold'}}>
          Dont have an account?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('SIGNUP');
          }}
          style={{color: '#E7364D', fontSize: 18, fontWeight: 'bold'}}>
          {' '}
          Signup
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centreContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    alignSelf: 'stretch',
    backgroundColor: COLORS.PRIMARY,
    elevation: 5,
    borderRadius: 5,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  signupRowStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
export default LoginScreen;
