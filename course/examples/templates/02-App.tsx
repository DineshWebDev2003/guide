import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type MyButtonProps = { onPress: () => void; title: string };

const MyButton: React.FC<MyButtonProps> = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <View style={{ alignItems: 'center', marginBottom: 12 }}>
      <Text style={{ fontSize: 20 }}>Count: {count}</Text>
      <MyButton title="+1" onPress={() => setCount(c => c + 1)} />
    </View>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chapter 02 - Building Blocks (TS)</Text>
      <Counter />
      <MyButton title="Say Hello" onPress={() => alert('Hello from TS!')} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7' },
  title: { fontSize: 22, marginBottom: 16, color: '#007AFF', fontWeight: '700' },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontWeight: '600' }
});
