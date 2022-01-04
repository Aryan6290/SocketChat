import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MessageModel} from '../../../models/MessageModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface ChatBoxProps {
  message: MessageModel;
  id: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({message, id}) => {
  return (
    <View
      style={[
        styles.rootStyle,
        {alignSelf: message.targetUser === id ? 'flex-start' : 'flex-end'},
      ]}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{message.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
export default ChatBox;
