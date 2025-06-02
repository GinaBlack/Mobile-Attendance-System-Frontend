// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const settingsOptions = [
    { name: 'Account', icon: 'person' },
    { name: 'Notifications', icon: 'notifications' },
    { name: 'Privacy & Security', icon: 'lock-closed' },
    { name: 'Help and Support', icon: 'help-circle' },
    { name: 'About', icon: 'information-circle' },
    { name: 'Log Out', icon: 'log-out', isDestructive: true },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a Setting"
          placeholderTextColor="#999"
        />
      </View>

      {/* Settings List */}
      <ScrollView style={styles.settingsList}>
        {settingsOptions.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.settingItem}
            onPress={() => console.log(item.name + ' pressed')}
          >
            <View style={styles.settingLeft}>
              <Ionicons 
                name={item.icon} 
                size={22} 
                color={item.isDestructive ? '#ff3b30' : '#007AFF'} 
              />
              <Text style={[
                styles.settingText, 
                item.isDestructive && styles.destructiveText
              ]}>
                {item.name}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  settingsList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  destructiveText: {
    color: '#ff3b30',
  },
});

export default SettingsScreen;