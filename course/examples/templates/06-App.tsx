import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLeft}>☰</Text>
        <Text style={styles.headerTitle}>My App</Text>
        <Text style={styles.headerRight}>⚙️</Text>
      </View>

      <View style={styles.card}>
        <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>Cute Kitten</Text>
          <Text style={styles.cardSubtitle}>A small example card.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#FFFFFF' },
  header: { flexDirection:'row', padding:12, alignItems:'center', justifyContent:'space-between' },
  headerLeft:{fontSize:20}, headerTitle:{fontSize:18,fontWeight:'700'}, headerRight:{fontSize:20},
  card:{flexDirection:'row', padding:12, backgroundColor:'#FFFFFF', borderRadius:8, elevation:2, margin:12},
  cardImage:{width:64,height:64,borderRadius:8}, cardBody:{marginLeft:12,justifyContent:'center'}, cardTitle:{fontSize:16,fontWeight:'700'}, cardSubtitle:{fontSize:12,color:'#8E8E93'}
});
