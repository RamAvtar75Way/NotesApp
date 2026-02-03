import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
import { getData } from '../utils/storage';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
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
