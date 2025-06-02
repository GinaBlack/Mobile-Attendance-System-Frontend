// screens/NotificationScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Notifications</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});

export default NotificationScreen;
