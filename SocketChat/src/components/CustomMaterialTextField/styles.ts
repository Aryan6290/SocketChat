import {StyleSheet} from 'react-native';
import {w} from '../../utils/globalstyles';

export const styles = StyleSheet.create({
  fullWidthBoxStyle: {
    marginVertical: 12,
    alignSelf: 'stretch',
    overflow: 'hidden',
    borderRadius: 5,
    borderWidth: 1,
    paddingBottom: 12,
  },
  labelContainer: {
    position: 'absolute',
    left: 12,
    top: -12,

    backgroundColor: 'white',
  },
  label: {
    fontSize: 4,
  },
  textFieldStyle: {
    color: '#212121',
    paddingTop: 32,
    paddingBottom: 8,
    paddingHorizontal: 12,
    borderColor: '#B9C4CA',
    borderWidth: 1,
    borderRadius: 5,

    fontSize: 16,

    margin: 0,

    // paddingVertical: 16,

    backgroundColor: '#fff',
  },
  emailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#e4e6eb',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 4,
    marginBottom: 2,
    minHeight: 14,
    maxWidth: w(80),
  },
  chipSvg: {
    backgroundColor: '#00000040',
    borderRadius: 50,
  },
  chipText: {
    fontSize: w(3.9),
    marginRight: 8,
    color: '#000000',
    flexShrink: 1,
  },
  emailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 22,
  },
});
