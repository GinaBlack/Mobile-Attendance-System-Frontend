import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const TopBar = () => {
  const navigation = useNavigation();

  return (
    <View>
      {/* White space before top bar */}
      <View style={styles.spacer} />

      {/* Actual top bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Attendr</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 50,
    backgroundColor: '#fff', // white space
  },
  topBar: {
    height: 60,
    backgroundColor: '#2F80ED',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TopBar;
