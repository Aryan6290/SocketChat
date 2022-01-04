import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserModel} from '../../models/UserModel';
import {getAllUsers} from '../../services/HomeServices';
import {gs} from '../../utils/globalstyles';
import HomeHeader from './components/HomeHeader';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../data/data';
import ChatUser from './components/ChatUser';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../data/params';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from 'socket.io-client';
interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamsList, 'HOME'>;
  route: RouteProp<RootStackParamsList, 'HOME'>;
}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({
  navigation,
  route,
}) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [socket] = useState(() => io('http://192.168.0.102:4000'));
  const getChats = async () => {
    const res = await getAllUsers();
    console.log(res.data.data);
    setUsers(res.data.data);
  };
  useEffect(() => {
    console.log(route.params.id);
    socket.emit('signin', route.params.id);
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getChats();
  }, []);
  return (
    <SafeAreaView style={gs.pageRoot}>
      <HomeHeader
        title="Home"
        endAction={
          <Ionicon name="power-sharp" size={26} color={COLORS.DANGER} />
        }
      />
      <FlatList
        data={users}
        renderItem={({item, index}) => (
          <ChatUser
            key={index}
            onPress={() => {
              navigation.navigate('CHAT', {user: item, id: route.params.id});
            }}
            user={item}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
