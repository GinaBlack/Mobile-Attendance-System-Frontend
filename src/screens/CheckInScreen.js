// screens/CheckInScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CheckInScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Check in by scanning your face</Text>
    
    {/* Placeholder for face scanning area - you'll replace this with your actual camera component */}
    <View style={styles.scanArea}>
      <Image 
        source={require('../assets/face-scan-placeholder.png')} // Replace with your actual image
        style={styles.scanImage}
      />
    </View>
    
    <TouchableOpacity style={styles.scanButton}>
      <Text style={styles.scanButtonText}>Scan my face</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginBottom: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanImage: {
    width: '100%',
    height: '100%',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckInScreen;