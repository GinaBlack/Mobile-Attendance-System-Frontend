import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopBar from '../TopBar';

export default function RequestsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.title}>Requests</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
