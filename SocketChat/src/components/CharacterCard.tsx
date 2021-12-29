import React from 'react';
import {Image, Pressable, StyleSheet, Text, ToastAndroid} from 'react-native';

interface CharacterCardProps {
  name: string;
  image: string;
}

const CharacterCard: React.FunctionComponent<CharacterCardProps> = ({
  name,
  image,
}) => {
  return (
    <Pressable
      onPress={() => {
        ToastAndroid.show(name, ToastAndroid.SHORT);
      }}
      android_ripple={{color: '#717171'}}
      style={styles.rootStyle}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: image,
        }}
      />
      <Text style={{borderRadius: 10}}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 6,
  },
  imageStyle: {
    marginRight: 10,

    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
export default CharacterCard;
