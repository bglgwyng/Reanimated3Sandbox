/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {memo, useLayoutEffect, useReducer, useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Example1 = memo(() => {
  const [x, toggle] = useReducer(x => !x, false);
  const t = useSharedValue(false);

  useLayoutEffect(() => {
    t.value = x;
  }, [t, x]);

  const style = useAnimatedStyle(
    () => ({
      width: t.value ? 100 : 0,
      height: t.value ? 100 : 0,
    }),
    [t],
  );

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <View
        style={{width: 200, height: 200, backgroundColor: x ? 'red' : 'blue'}}>
        <Reanimated.View style={[style, {backgroundColor: 'green'}]} />
      </View>
      <View style={{marginTop: 10}}>
        <Button title="Press me" onPress={toggle} />
      </View>
    </View>
  );
});

function App(): JSX.Element {
  return (
    <View style={{flexGrow: 1}}>
      <Example1 />
    </View>
  );
}

export default App;
