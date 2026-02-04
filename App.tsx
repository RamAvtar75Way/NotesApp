import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { COLORS } from './constants/theme';
import TabNavigator from './navigation/TabNavigator';
import AddNoteScreen from './screens/AddNoteScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import SplashScreen from './screens/SplashScreen';

export type RootStackParamList = {
    Splash: undefined;
    ProfileSetup: undefined;
    MainTabs: undefined;
    AddNote: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen
                        name="Splash"
                        component={SplashScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ProfileSetup"
                        component={ProfileSetupScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="MainTabs"
                        component={TabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="AddNote"
                        component={AddNoteScreen}
                        options={{
                            title: 'Add New Note',
                            headerStyle: {
                                backgroundColor: COLORS.primary,
                            },
                            headerTintColor: COLORS.surface,
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
