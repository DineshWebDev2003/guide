# 🧱 Chapter 2: Building Blocks (Components, Props, State)

## 🎯 Goals
- Understand components
- Learn props and state
- Build a small interactive component

## 🔵 What is a Component?
A component is like a Lego block. Each block (component) does one job. You can reuse it to build bigger things.

## 🟢 Example: A Simple Button Component
```javascript
// components/MyButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  }
});

export default MyButton;
```

## 🟡 Props - The Inputs
Props are inputs to components. Like giving a toy block a sticker to change how it looks.

```javascript
<MyButton title="Click me" onPress={() => alert('Hi')} />
```

## 🟡 State - The Memory
State is internal memory for a component. It can change over time.

```javascript
import React, { useState } from 'react';
import { View, Text } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>Count: {count}</Text>
      <MyButton title="+1" onPress={() => setCount(c => c + 1)} />
    </View>
  );
};
```

## ⚠️ Common Mistakes
- Forgetting to import `useState`
- Changing state directly (always use setter)

## 🎮 Practice Exercises
1. Create a `Toggle` component that switches text between "ON" and "OFF".
2. Make a `LikeButton` that shows number of likes.

## ✅ Recap
Components + Props + State = Powerful UI blocks.

Next: [Chapter 3: Animations](../03-animations/README.md)

## 🛠️ Step-by-step: Build and run a small app (runnable)

1. Create a new project if you don't have one:

```bash
npx react-native init BlocksDemo
cd BlocksDemo
```

2. Create the `components/MyButton.js` and `components/Counter.js` files with the code from above.

3. Replace `App.js` with the example below and run the app:

```javascript
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import MyButton from './components/MyButton';
import Counter from './components/Counter';

const App = () => (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20, marginBottom: 12 }}>Components Demo</Text>
    <Counter />
    <MyButton title="Say Hello" onPress={() => alert('Hello!')} />
  </SafeAreaView>
);

export default App;
```

4. Run:

```bash
npx react-native run-android # or run-ios on macOS
```

5. Observe the counter increase and button alert. Change props and styles to experiment.