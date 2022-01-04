import {Image, StyleSheet, Text} from 'react-native';
import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {imageAssets} from '../../../data/data';

interface HomeHeaderProps {
  title: string;
  endAction?: ReactElement;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({title, endAction}) => {
  return (
    <View style={styles.headerRootStyle}>
      <Image style={styles.iconStyle} source={imageAssets.chat} />

      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
      <View style={styles.endActionStyle}>{endAction ? endAction : <></>}</View>
    </View>
  );
};

export default HomeHeader;

export const styles = StyleSheet.create({
  headerRootStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 0.8,
    marginBottom: 2,
    borderBottomColor: '#a9a9a9',
  },
  iconStyle: {
    position: 'absolute',
    left: 12,
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  endActionStyle: {
    position: 'absolute',
    right: 12,
  },
});
