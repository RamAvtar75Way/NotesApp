import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../App';
import { COLORS } from '../constants/theme';
import { getData } from '../utils/storage';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();

    const checkProfile = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));

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
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateAnim }
            ],
          },
        ]}
      >
        <Animated.Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </Animated.View>

      <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
        Offline Notes • Fast • Private
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoWrapper: {
    padding: 30,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  tagline: {
    marginTop: 28,
    fontSize: 16,
    color: COLORS.textSecondary || '#666',
    letterSpacing: 1,
    fontWeight: '500',
  },
});

export default SplashScreen;
