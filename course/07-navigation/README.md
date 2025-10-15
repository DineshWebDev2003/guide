# 🧭 Chapter 7: Navigation (Move Between Screens)

## 🎯 Goals
- Learn to navigate between screens
- Use stack and tab navigation

## 🔵 React Navigation Setup
```bash
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-gesture-handler react-native-reanimated
```

## 🟢 Basic Stack Navigator
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

## 🎮 Practice Exercises
1. Create a Home screen and a Details screen and navigate between them.
2. Add a back button and a header title.

## ✅ Recap
Navigation lets users move around your app smoothly.

Next: [Chapter 8: Publishing](../08-publishing/README.md)

## 🛠️ Quick Start (step-by-step)

1. Install packages shown above.
2. Wrap your app with `NavigationContainer`.
3. Create screens as separate components.
4. Test navigation using the simulator/device.

```javascript
// Example Home screen
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home</Text>
    <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
  </View>
);

export default HomeScreen;
```

Tip: Ensure gesture-handler is properly configured on Android (see official docs).