import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Publishing Checklist (TS)</Text>
        <Text>- Update version and build numbers</Text>
        <Text>- Test on real devices</Text>
        <Text>- Prepare screenshots</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({ container:{flex:1,backgroundColor:'#FFFFFF'}, title:{fontSize:20,fontWeight:'700',color:'#007AFF'} });
