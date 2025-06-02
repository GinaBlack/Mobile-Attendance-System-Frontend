// screens/HistoryScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Attendance History</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});

export default HistoryScreen;
