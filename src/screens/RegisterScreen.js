import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    matricule: '',
    email: '',
    password: '',
    courseDetails: '',
  });
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Login');
    }, 1500);
  };

  const requestCameraPermission = async () => {
    if (hasPermission === null) {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') {
        setShowCamera(true);
      } else {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to capture your face.',
          [{ text: 'OK' }]
        );
      }
    } else if (hasPermission === 'granted') {
      setShowCamera(true);
    } else {
      Alert.alert(
        'Permission Denied',
        'Please enable camera access in your device settings to use this feature.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleCaptureFace = async () => {
    if (camera) {
      try {
        const photo = await camera.takePictureAsync({
          quality: 0.5,
          base64: true,
        });
        // TODO: Process the captured photo
        console.log('Photo captured:', photo.uri);
        setShowCamera(false);
        setCurrentStep(3);
      } catch (error) {
        console.error('Error capturing photo:', error);
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
      }
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[...Array(totalSteps)].map((_, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.step,
              currentStep > index + 1 && styles.stepCompleted,
              currentStep === index + 1 && styles.stepActive,
            ]}
          >
            {currentStep > index + 1 ? (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            ) : (
              <Text style={styles.stepNumber}>{index + 1}</Text>
            )}
          </View>
          {index < totalSteps - 1 && (
            <View
              style={[
                styles.stepLine,
                currentStep > index + 1 && styles.stepLineCompleted,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#1E3A8A" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="id-card-outline" size={20} color="#1E3A8A" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.matricule}
                onChangeText={(value) => handleInputChange('matricule', value)}
                placeholder="Enter your matricule number"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity
              style={styles.nextFullButton}
              onPress={() => setCurrentStep(2)}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={22} color="#F9FAFB" style={styles.nextButtonIcon} />
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Account Details</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#1E3A8A" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#1E3A8A" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#1E3A8A"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="book-outline" size={20} color="#1E3A8A" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.courseDetails}
                onChangeText={(value) => handleInputChange('courseDetails', value)}
                placeholder="Enter your course details"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>
            <View style={styles.stepButtons}>
              <TouchableOpacity
                style={[styles.stepButton, styles.backButton]}
                onPress={() => setCurrentStep(1)}
              >
                <Ionicons name="arrow-back" size={20} color="#1E3A8A" style={styles.buttonIcon} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.stepButton, styles.nextButton]}
                onPress={() => setCurrentStep(3)}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="#F9FAFB" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Face Verification</Text>
            <View style={styles.faceCaptureContainer}>
              <Image
                source={require('../../assets/face-placeholder.png')}
                style={styles.facePlaceholder}
                resizeMode="contain"
              />
              <Text style={styles.faceCaptureText}>
                Capture your face for secure login
              </Text>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={requestCameraPermission}
              >
                <Ionicons name="camera-outline" size={24} color="#F9FAFB" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Capture Face</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.stepButtons}>
              <TouchableOpacity
                style={[styles.stepButton, styles.backButton]}
                onPress={() => setCurrentStep(2)}
              >
                <Ionicons name="arrow-back" size={20} color="#1E3A8A" style={styles.buttonIcon} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.stepButton, styles.submitButton, isLoading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#F9FAFB" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Submit</Text>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#F9FAFB" style={styles.buttonIcon} />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {renderStepIndicator()}
            {renderStepContent()}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={styles.cameraContainer}>
          {hasPermission === 'granted' && (
            <Camera
              ref={ref => setCamera(ref)}
              style={styles.camera}
              type={CameraType.front}
            >
              <View style={styles.cameraOverlay}>
                <View style={styles.cameraFrame}>
                  <Text style={styles.cameraText}>
                    Align face within frame
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleCaptureFace}
                >
                  <Ionicons name="camera" size={24} color="#F9FAFB" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Capture</Text>
                </TouchableOpacity>
              </View>
            </Camera>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepActive: {
    backgroundColor: '#1E3A8A',
  },
  stepCompleted: {
    backgroundColor: '#10B981',
  },
  stepNumber: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  stepLineCompleted: {
    backgroundColor: '#10B981',
  },
  stepContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1F2937',
  },
  passwordInput: {
    paddingRight: 40,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  stepButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  stepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
  },
  backButton: {
    backgroundColor: '#F3F4F6',
  },
  nextButton: {
    backgroundColor: '#1E3A8A',
  },
  submitButton: {
    backgroundColor: '#10B981',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  buttonText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
  },
  backButtonText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
  },
  faceCaptureContainer: {
    alignItems: 'center',
    padding: 24,
  },
  facePlaceholder: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 24,
  },
  faceCaptureText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  captureButton: {
    backgroundColor: '#2DD4BF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 200,
    shadowColor: '#2DD4BF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#2DD4BF',
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#F9FAFB',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 200,
  },
  nextFullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E3A8A',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 8,
    width: '100%',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  nextButtonText: {
    color: '#F9FAFB',
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  nextButtonIcon: {
    marginLeft: 8,
  },
});

export default RegisterScreen; 