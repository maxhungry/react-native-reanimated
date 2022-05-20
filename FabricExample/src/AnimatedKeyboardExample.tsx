import Animated, {
  useAnimatedStyle,
  useAnimatedKeyboard,
  withTiming,
} from 'react-native-reanimated';
import {
  Button,
  TextInput,
  StyleSheet,
  Keyboard,
  ScrollView,
} from 'react-native';
import React from 'react';

const BOX_SIZE = 50;

function AnimatedStyleUpdateExample(): React.ReactElement {
  const keyboard = useAnimatedKeyboard();
  const style = useAnimatedStyle(() => {
    const isTransitioning =
      keyboard.isAnimating.value === keyboard.isShown.value;
    return {
      backgroundColor: keyboard.isShown.value ? 'red' : 'blue',
      borderRadius: withTiming(isTransitioning ? BOX_SIZE / 2 : 0),
    };
  });
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode="interactive"
      scrollEnabled={false}>
      <Animated.View style={[styles.box, style]} />
      <Animated.View style={translateStyle}>
        <Button
          title="Dismiss"
          onPress={() => {
            Keyboard.dismiss();
          }}
        />
        <TextInput style={styles.textInput} autoCorrect />
      </Animated.View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 50,
  },
  box: { width: BOX_SIZE, height: BOX_SIZE, marginBottom: 200 },
  textInput: {
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 30,
    width: 200,
  },
});

export default AnimatedStyleUpdateExample;