// screens/ScheduleScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScheduleScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Class Schedule</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});

export default ScheduleScreen;
