/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

function App(): JSX.Element {
  const [foo, setFoo] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setFoo(foo => !foo);
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={{flexGrow: 1}}>
      {foo && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[StyleSheet.absoluteFill, {backgroundColor: 'blue'}]}
        />
      )}
    </View>
  );
}

export default App;
