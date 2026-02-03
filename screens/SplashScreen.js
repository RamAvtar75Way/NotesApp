import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getData } from '../utils/storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkProfile = async () => {
      const profile = await getData('profile');
      if (profile) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('ProfileSetup');
      }
    };
    checkProfile();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offline Notes App</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SplashScreen;
