import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, Button, FlatList, StyleSheet } from 'react-native';

const fetchWithRetry = async (url, retries = 2) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    if (retries > 0) return fetchWithRetry(url, retries - 1);
    throw err;
  }
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts');
      setPosts(data.slice(0, 10));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <SafeAreaView style={styles.center}><ActivityIndicator /></SafeAreaView>
  );

  if (error) return (
    <SafeAreaView style={styles.container}><Text>Error: {error}</Text><Button title="Retry" onPress={load} /></SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chapter 05 - Posts</Text>
      <FlatList data={posts} keyExtractor={p => p.id.toString()} renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#007AFF' },
  item: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' }
});
