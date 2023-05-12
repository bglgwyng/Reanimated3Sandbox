/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Animated, {
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
        <Animated.View style={[style, {backgroundColor: 'green'}]} />
      </View>
      <View style={{marginTop: 10}}>
        <Button title="Press me" onPress={toggle} />
      </View>
    </View>
  );
});

function App(): JSX.Element {
  const [foo, setFoo] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setFoo(x => !x);
    }, 100);
  }, []);
  return (
    <>
      {foo && new Array(1000).fill(0).map((_, i) => <View key={i} />)}
      <Example1 />
    </>
  );
}

export default App;
