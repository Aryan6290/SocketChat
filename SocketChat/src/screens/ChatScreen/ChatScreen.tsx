import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {io, Socket} from 'socket.io-client';
import OutlineBoxTextfieldComponent from '../../components/CustomMaterialTextField/OutlineMaterialTextField';
import {RootStackParamsList} from '../../data/params';
import {MessageModel} from '../../models/MessageModel';
import {gs} from '../../utils/globalstyles';
import ChatBox from './components/ChatBox';

interface ChatScreenProps {
  navigation: StackNavigationProp<RootStackParamsList, 'CHAT'>;
  route: RouteProp<RootStackParamsList, 'CHAT'>;
}

const ChatScreen: React.FC<ChatScreenProps> = ({route}) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const [chatMessage, setChatMessage] = useState('');
  const submitChatMessage = async () => {
    console.log(route.params.user);
    setMessages([
      ...messages,
      {
        message: chatMessage,
        sourceUser: route.params.id,
        targetUser: route.params.user._id,
      },
    ]);
    socket?.emit('chat message', {
      message: chatMessage,
      sourceUser: route.params.id,
      targetUser: route.params.user._id,
    });
  };
  useEffect(() => {
    const newSocket = io('http://192.168.0.102:4000');
    newSocket?.on('chat message', (msg2: MessageModel) => {
      console.log(msg2.message);
      const temp = [...messages];
      messages.unshift(msg2);
      console.log(temp.length);
      setMessages(temp);
    });
    setSocket(newSocket);
    return () => {
      newSocket?.disconnect();
    };
  }, []);
  return (
    <SafeAreaView style={gs.pageRoot}>
      <FlatList
        inverted
        data={messages}
        renderItem={({item, index}) => (
          <ChatBox id={route.params.id} message={item} />
        )}
        ListHeaderComponent={
          <OutlineBoxTextfieldComponent
            label="Your message"
            textValue={chatMessage}
            onChangeText={setChatMessage}
            onSubmitEditing={submitChatMessage}
          />
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputStyle: {},
});
export default ChatScreen;
