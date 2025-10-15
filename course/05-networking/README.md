# 🌐 Chapter 5: Connecting to the Internet (APIs)

## 🎯 Goals
- Fetch data from the internet
- Show loading state
- Handle errors

## 🔵 Fetching Data
```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      {users.map(u => (
        <Text key={u.id}>{u.name}</Text>
      ))}
    </View>
  );
};

export default UsersList;
```

## 🟡 Handling Errors & Retry
```javascript
// Show a retry button when fetch fails
```

## 🎮 Practice Exercises
1. Display posts from an API.
2. Add pull-to-refresh to reload data.

## ✅ Recap
APIs bring your app to life with real data.

Next: [Chapter 6: Styling](../06-styling/README.md)

## 🛠️ Runnable Example: Fetch with retry and loading state

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';

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

export default function Posts() {
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

  if (loading) return <ActivityIndicator />;

  if (error) return (
    <View>
      <Text>Error: {error}</Text>
      <Button title="Retry" onPress={load} />
    </View>
  );

  return (
    <View>
      {posts.map(p => <Text key={p.id}>{p.title}</Text>)}
    </View>
  );
}
```