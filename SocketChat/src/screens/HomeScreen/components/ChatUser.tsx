import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, imageAssets} from '../../../data/data';
import {UserModel} from '../../../models/UserModel';
import Ionicon from 'react-native-vector-icons/Ionicons';
interface ChatUserProps {
  user: UserModel;
  onPress: () => void;
}

const ChatUser: React.FC<ChatUserProps> = ({user, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.rootStyle}>
      <Image
        resizeMode="cover"
        style={styles.imageStyle}
        source={user?.image ? {uri: user.image} : imageAssets.chat}
      />
      <Text>{user.userName}</Text>
      <Ionicon size={26} color={COLORS.PRIMARY} name="chevron-forward" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,

    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    elevation: 5,
  },
  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#212121',

    overflow: 'hidden',
  },
});
export default ChatUser;
