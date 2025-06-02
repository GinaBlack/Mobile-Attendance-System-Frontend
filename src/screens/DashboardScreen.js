import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../TopBar';

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.welcomeSection}>
          <View style={styles.textBlock}>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.nameText}>Obi 👋</Text>
            <Text style={styles.roleText}>Student</Text>
          </View>
          <TouchableOpacity
            style={styles.profilePic}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.photoLabel}>PHOTO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ongoingCard}>
          <View>
            <Text style={styles.sectionTitle}>Ongoing</Text>
            <Text style={styles.classText}>CEF 444</Text>
            <Text style={styles.classText}>AI and Machine Learning</Text>
            <Text style={styles.classText}>HALL 1</Text>
            <Text style={styles.classText}>7AM</Text>
          </View>
          <View style={styles.statusBlock}>
            <Text>Status - In class</Text>
            <TouchableOpacity
              style={styles.checkInButton}
              onPress={() => navigation.navigate('CheckIn')}
            >
              <Text style={styles.checkInText}>Check-In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subTitle}>Upcoming</Text>
        <View style={styles.upcomingRow}>
          <TouchableOpacity
            style={styles.upcomingCard}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Text>Cloud Computing</Text>
            <Text>BGFL</Text>
            <Text>12PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.upcomingCard}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Text>Software V and V</Text>
            <Text>Hall 1</Text>
            <Text>1PM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.upcomingCard}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Text>Feedback Systems</Text>
            <Text>Tech 1</Text>
            <Text>3PM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.subTitle}>Attendance Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.percentText}>90%</Text>
              <Text>Present</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.percentText}>10%</Text>
              <Text>Absent</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.percentText}>0%</Text>
              <Text>Excused</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scroll: { padding: 16 },

  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2F80ED',
    padding: 16,
    borderRadius: 12,
  },
  textBlock: {},
  welcomeText: { color: '#fff', fontSize: 16 },
  nameText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  roleText: { color: '#fff' },

  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoLabel: { color: '#bbb' },

  ongoingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontWeight: 'bold' },
  classText: {},

  statusBlock: { justifyContent: 'center', alignItems: 'center' },
  checkInButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  checkInText: { color: '#fff' },

  subTitle: { fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  upcomingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upcomingCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },

  summarySection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryBox: { alignItems: 'center' },
  percentText: { fontSize: 20, fontWeight: 'bold' },
});
