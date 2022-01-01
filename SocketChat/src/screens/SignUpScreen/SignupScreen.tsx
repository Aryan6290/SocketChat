import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OutlineBoxTextfieldComponent from '../../components/CustomMaterialTextField/OutlineMaterialTextField';
import {RootStackParamsList} from '../../data/params';
import {createAndLoginUser} from '../../services/LoginServices';
import {gs} from '../../utils/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initService} from '../../services/BaseServices';
interface SignupScreenProps {
  navigation: StackNavigationProp<RootStackParamsList, 'SIGNUP'>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onButtonPress = async () => {
    try {
      const res = await createAndLoginUser(email, userName, password);
      if (res.status === 200) {
        await initService(res.data.token);
        await AsyncStorage.setItem('token', res.data.token);
        navigation.navigate('HOME');
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={[gs.pageRoot, gs.centreContent]}>
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textFieldStyle: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
export default SignupScreen;
