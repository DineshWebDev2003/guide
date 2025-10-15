# 🎬 Chapter 3: Animations and Interactions

## 🎯 Goals
- Learn basic animations
- Make buttons and screens move
- Create smooth transitions

## 🔵 Simple Fade Animation
```javascript
import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, Button } from 'react-native';

const FadeInView = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default function AnimExample() {
  return (
    <FadeInView>
      <Text>Look! I faded in 🎉</Text>
    </FadeInView>
  );
}
```

## 🟡 Touch Interactions
Use `TouchableOpacity`, `TouchableHighlight`, or `Pressable` to handle touches.

## 🎮 Practice Exercises
1. Animate a box to move left and right.
2. Create a button that grows when pressed.

## ✅ Recap
Animations make apps feel alive. Keep them simple and performant.

Next: [Chapter 4: Saving Data](../04-data/README.md)

## 🛠️ Runnable Example: Box move on press

```javascript
import React, { useRef } from 'react';
import { Animated, View, Button } from 'react-native';

export default function MovingBox() {
  const translateX = useRef(new Animated.Value(0)).current;

  const move = () => {
    Animated.sequence([
      Animated.timing(translateX, { toValue: 150, duration: 400, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 400, useNativeDriver: true })
    ]).start();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={{ width: 80, height: 80, backgroundColor: '#34C759', transform: [{ translateX }] }} />
      <Button title="Move" onPress={move} />
    </View>
  );
}
```

Tip: Use `useNativeDriver: true` for smoother animations when possible.