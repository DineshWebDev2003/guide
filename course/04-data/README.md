# 💾 Chapter 4: Saving Data (Local Storage & Lists)

## 🎯 Goals
- Learn where to save data
- Use lists to show information
- Save small data on the device

## 🔵 Local Storage with AsyncStorage
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveName = async (name) => {
  try {
    await AsyncStorage.setItem('@user_name', name);
  } catch (e) {
    console.error('Save error', e);
  }
};

const readName = async () => {
  try {
    const name = await AsyncStorage.getItem('@user_name');
    return name;
  } catch (e) {
    console.error('Read error', e);
  }
};
```

## 🟢 Using Lists with FlatList
```javascript
import { FlatList, Text } from 'react-native';

const myData = [
  { id: '1', title: 'First' },
  { id: '2', title: 'Second' }
];

<FlatList
  data={myData}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Text>{item.title}</Text>}
/>
```

## 🎮 Practice Exercises
1. Create a todo list app storing tasks in AsyncStorage.
2. Display tasks using `FlatList`.

## ✅ Recap
Save data to keep users happy. Use lists to show many items.

Next: [Chapter 5: Networking](../05-networking/README.md)

## 🛠️ Runnable Example: Minimal Todo (save & list)

```javascript
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoApp() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('@tasks');
      if (saved) setTasks(JSON.parse(saved));
    })();
  }, []);

  const addTask = async () => {
    const newTasks = [...tasks, { id: Date.now().toString(), title: text }];
    setTasks(newTasks);
    await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    setText('');
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput value={text} onChangeText={setText} placeholder="New task" />
      <Button title="Add" onPress={addTask} />
      <FlatList data={tasks} keyExtractor={t => t.id} renderItem={({ item }) => <Text>{item.title}</Text>} />
    </View>
  );
}
```

Note: Install `@react-native-async-storage/async-storage` before running.