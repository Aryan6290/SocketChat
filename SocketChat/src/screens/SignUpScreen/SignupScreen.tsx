import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OutlineBoxTextfieldComponent from '../../components/CustomMaterialTextField/OutlineMaterialTextField';
import {RootStackParamsList} from '../../data/params';
import {createAndLoginUser} from '../../services/LoginServices';
import {gs} from '../../utils/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initService} from '../../services/BaseServices';
import {showToast} from '../../utils/showToast';
import {COLORS, imageAssets} from '../../data/data';
interface SignupScreenProps {
  navigation: StackNavigationProp<RootStackParamsList, 'SIGNUP'>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onButtonPress = async () => {
    if (!userName || !email || !password) {
      showToast('Please fill necessary fields');
      return;
    }
    try {
      const res = await createAndLoginUser(email, userName, password);
      if (res.status === 200) {
        await initService(res.data.token);
        await AsyncStorage.setItem('token', res.data.token);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'HOME',
            },
          ],
        });
      } else {
        showToast('Failed to Signup! Check Internet or Try again!');
      }
    } catch (error) {
      showToast('Failed to Signup! Check Internet or Try again!');
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={[gs.pageRoot, gs.centreContent]}>
      <Image
        source={imageAssets.signup}
        style={{width: 140, height: 140, marginBottom: 20}}
      />
      <OutlineBoxTextfieldComponent
        style={styles.textFieldStyle}
        label="UserName"
        textValue={userName}
        onChangeText={setUserName}
      />
      <OutlineBoxTextfieldComponent
        style={styles.textFieldStyle}
        label="Email"
        textValue={email}
        onChangeText={setEmail}
      />
      <OutlineBoxTextfieldComponent
        style={styles.textFieldStyle}
        label="Password"
        textValue={password}
        onChangeText={setPassword}
      />
      <Pressable
        onPress={onButtonPress}
        android_ripple={{color: '#0000001a'}}
        style={[gs.centreContent, styles.btnStyle]}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          Create an Account
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textFieldStyle: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginVertical: 10,
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
});
export default SignupScreen;
