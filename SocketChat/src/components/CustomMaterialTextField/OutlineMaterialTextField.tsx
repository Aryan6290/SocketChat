/* eslint-disable react/destructuring-assignment */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, Pressable, TextInput, View} from 'react-native';
import {COLORS} from '../../data/data';
import {w} from '../../utils/globalstyles';

import {styles} from './styles';

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  textValue: string;
  big?: boolean;
  onChangeText: (text: string) => void;
};

const OutlineBoxTextfieldComponent: React.FC<Props> = props => {
  const focusAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [borderColor] = useState('#a9a9a9');
  const {label, style, onBlur, onFocus, ...restOfProps} = props;

  useEffect(() => {
    Animated.timing(focusAnim, {
      // toValue: isFocused ? 1 : 0,
      toValue: isFocused || props.textValue ? 1 : 0,
      // I took duration and easing values
      // from material.io demo page
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      // we'll come back to this later
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusAnim, isFocused]);
  useEffect(() => {
    if (props.textValue !== '') {
      Animated.timing(focusAnim, {
        // toValue: isFocused ? 1 : 0,
        toValue: isFocused || props.textValue ? 1 : 0,
        // I took duration and easing values
        // from material.io demo page
        duration: 1,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        // we'll come back to this later
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.textValue]);
  return (
    <View style={[style]}>
      <TextInput
        ref={inputRef}
        value={props.textValue}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        style={[
          styles.textFieldStyle,
          {paddingBottom: props.big ? 16 : 4},
          {borderColor: isFocused ? COLORS.PRIMARY : borderColor},
        ]}
        {...restOfProps}
      />
      <Animated.View
        style={[
          styles.labelContainer,
          {
            // top: isFocused ? -12 : 24,
            top: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [props.big ? 24 : 20, 8],
            }),
          },
        ]}>
        <Pressable onPress={() => inputRef.current?.focus()}>
          <Animated.Text
            style={[
              styles.label,
              {
                color: isFocused ? COLORS.PRIMARY : borderColor,
                fontSize: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [w(5), w(4)],
                }),
                // fontSize: isFocused ? 16 : 20,
              },
            ]}>
            {label}
          </Animated.Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default OutlineBoxTextfieldComponent;
