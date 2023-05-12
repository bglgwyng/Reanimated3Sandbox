/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import {Button, StyleSheet, View, useWindowDimensions} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Example2 = memo(() => {
  const {width} = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const translate = useSharedValue(0);

  useLayoutEffect(() => {
    translate.value = 0;
  }, [index, translate]);

  const goRight = useCallback(() => {
    translate.value = withTiming(-width, {duration: 200}, finished => {
      if (finished) {
        runOnJS(setIndex)(1);
      }
    });
  }, [translate, width]);

  const goLeft = useCallback(() => {
    translate.value = withTiming(width, {duration: 200}, finished => {
      if (finished) {
        runOnJS(setIndex)(0);
      }
    });
  }, [translate, width]);

  useEffect(() => {
    let live = true;
    (async () => {
      while (live) {
        goRight();
        await new Promise<void>(resolve => setTimeout(resolve, 400));
        goLeft();
        await new Promise<void>(resolve => setTimeout(resolve, 400));
      }
    })();
    return () => {
      live = false;
    };
  }, [goLeft, goRight]);

  const style1 = useAnimatedStyle(() => {
    return {
      width: '100%',
      transform: [{translateX: translate.value}],
    };
  }, [translate]);

  return (
    <Animated.View style={style1}>
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'stretch',
          height: '100%',
          transform: [{translateX: -index * width}],
        }}>
        <View style={{width, backgroundColor: 'red'}} />
        <View style={{width, backgroundColor: 'blue'}} />
      </Animated.View>
    </Animated.View>
  );
});

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
  return (
    <>
      {/* <Example1 /> */}
      <Example2 />
    </>
  );
}

export default App;
