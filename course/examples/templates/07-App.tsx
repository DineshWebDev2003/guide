import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

const App: React.FC<any> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Navigation Demo (TS)</Text>
        <Button title="Go to Details" onPress={() => navigation && navigation.navigate && navigation.navigate('Details')} />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({ container:{flex:1}, center:{flex:1,justifyContent:'center',alignItems:'center'}, title:{fontSize:20,fontWeight:'700'} });
