# 🎨 Chapter 6: Styling and Layout

## 🎯 Goals
- Understand styles in React Native
- Learn Flexbox layout
- Use colors and themes

## 🔵 Basic Styles
```javascript
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7'
  },
  title: {
    fontSize: 24,
    color: '#007AFF'
  }
});
```

## 🟢 Flexbox Basics
```javascript
// Row layout
<View style={{ flexDirection: 'row' }}>
  <View style={{ flex: 1, backgroundColor: '#FF3B30' }} />
  <View style={{ flex: 2, backgroundColor: '#34C759' }} />
</View>
```

## 🎮 Practice Exercises
1. Build a header with left icon, title, and right icon.
2. Create a card layout with image and text.

## ✅ Recap
Styles make your app look great. Flexbox helps with layout.

Next: [Chapter 7: Navigation](../07-navigation/README.md)

## 🛠️ Runnable Example: Header + Card

```javascript
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerLeft}>☰</Text>
    <Text style={styles.headerTitle}>My App</Text>
    <Text style={styles.headerRight}>⚙️</Text>
  </View>
);

const Card = ({ title, subtitle }) => (
  <View style={styles.card}>
    <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.cardImage} />
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', padding: 12, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' },
  headerLeft: { fontSize: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerRight: { fontSize: 20 },
  card: { flexDirection: 'row', padding: 12, backgroundColor: '#FFFFFF', borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, elevation: 2, margin: 12 },
  cardImage: { width: 64, height: 64, borderRadius: 8 },
  cardBody: { marginLeft: 12, justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardSubtitle: { fontSize: 12, color: '#8E8E93' }
});

export { Header, Card };
```

Tip: Use `justifyContent` and `alignItems` to fine-tune layouts.