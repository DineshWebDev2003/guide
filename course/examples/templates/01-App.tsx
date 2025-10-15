import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chapter 01 - Getting Started (TS)</Text>
      <Text style={styles.body}>Welcome! Change this text and save to see hot reload.</Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  title: { fontSize: 22, color: '#007AFF', fontWeight: '700' },
  body: { marginTop: 8, color: '#333' }
});
