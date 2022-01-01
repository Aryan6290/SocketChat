import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {io} from 'socket.io-client';

interface ChatScreenProps {}

const ChatScreen: React.FC<ChatScreenProps> = ({}) => {
  const [socket] = useState(() => io('http://192.168.0.102:4000'));
  const [messages, setMessages] = useState<string[]>([]);

  const [chatMessage, setChatMessage] = useState('');
  const submitChatMessage = async () => {
    setMessages([...messages, chatMessage]);
    socket.emit('chat message', chatMessage);
  };
  useEffect(() => {
    socket.on('chat message', (msg2: string) => {
      console.log(messages.length);
      const temp = [...messages];
      messages.push(msg2);
      console.log(temp.length);
      setMessages(temp);
    });
    return () => {
      socket?.disconnect();
    };
  }, []);
  return <View></View>;
};

export default ChatScreen;
