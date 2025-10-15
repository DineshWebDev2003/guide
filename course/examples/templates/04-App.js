import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('@tasks');
      if (saved) setTasks(JSON.parse(saved));
    })();
  }, []);

  const addTask = async () => {
    if (!text) return;
    const newTasks = [...tasks, { id: Date.now().toString(), title: text }];
    setTasks(newTasks);
    await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chapter 04 - Todo Demo</Text>
      <TextInput value={text} onChangeText={setText} placeholder="New task" style={styles.input} />
      <Button title="Add" onPress={addTask} />
      <FlatList data={tasks} keyExtractor={t => t.id} renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFFFFF' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#007AFF' },
  input: { borderWidth: 1, borderColor: '#E5E5EA', padding: 8, marginBottom: 8, borderRadius: 6 },
  item: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' }
});
