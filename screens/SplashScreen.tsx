import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { getData } from '../utils/storage';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkProfile = async () => {
      // Simulate a small delay for a better user experience (optional)
      await new Promise(resolve => setTimeout(resolve, 1500));

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
      <Text style={styles.title}>Offline Notes</Text>
      <Text style={styles.subtitle}>Capture your thoughts anywhere</Text>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={COLORS.surface} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.surface,
    marginBottom: SPACING.s,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: FONTS.size.m,
    color: COLORS.surface,
    opacity: 0.9,
    marginBottom: SPACING.xxl,
  },
  indicatorContainer: {
    marginTop: SPACING.l,
  },
});

export default SplashScreen;
