import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllUsers = async () => {
  const userId = await AsyncStorage.getItem('userId');

  const res = await axios.post('/users', {userId});
  return res;
};
