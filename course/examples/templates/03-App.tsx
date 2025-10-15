import React, { useRef } from 'react';
import { Animated, View, Button, SafeAreaView, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  const move = () => {
    Animated.sequence([
      Animated.timing(translateX, { toValue: 150, duration: 400, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 400, useNativeDriver: true })
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ width: 80, height: 80, backgroundColor: '#34C759', transform: [{ translateX }] }} />
      <View style={{ marginTop: 12 }}>
        <Button title="Move" onPress={move} />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({ container: { flex:1, justifyContent: 'center', alignItems: 'center' } });
