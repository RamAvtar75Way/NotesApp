import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../App';
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';
import { Profile, storeData } from '../utils/storage';

type ProfileSetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;

interface Props {
    navigation: ProfileSetupScreenNavigationProp;
}

const ProfileSetupScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const saveProfile = async () => {
        if (!name || !email) {
            Alert.alert('Error', 'Please fill name and email');
            return;
        }

        const profile: Profile = { name, email, image };
        await storeData('profile', profile);
        navigation.replace('MainTabs');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Create Profile</Text>
                    <Text style={styles.subHeader}>Let's get you started</Text>
                </View>

                <View style={styles.formContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.image} />
                        ) : (
                            <View style={styles.placeholder}>
                                <Ionicons name="camera-outline" size={40} color={COLORS.textSecondary} />
                                <Text style={styles.placeholderText}>Add Photo</Text>
                            </View>
                        )}
                        <View style={styles.editIconContainer}>
                            <Ionicons name="pencil" size={16} color={COLORS.surface} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            placeholderTextColor={COLORS.textSecondary}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="john@example.com"
                            placeholderTextColor={COLORS.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={saveProfile}>
                        <Text style={styles.buttonText}>Save Profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flexGrow: 1,
        padding: SPACING.l,
    },
    headerContainer: {
        marginTop: SPACING.xl,
        marginBottom: SPACING.xxl,
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    subHeader: {
        fontSize: FONTS.size.m,
        color: COLORS.textSecondary,
    },
    formContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: SPACING.m,
        padding: SPACING.l,
        ...SHADOWS.medium,
    },
    imageContainer: {
        alignSelf: 'center',
        marginBottom: SPACING.xl,
        marginTop: -SPACING.xxl - 20, // Pull up to overlap with header area
        ...SHADOWS.small,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: COLORS.surface,
    },
    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.surface,
    },
    placeholderText: {
        fontSize: FONTS.size.s,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.surface,
    },
    inputGroup: {
        marginBottom: SPACING.l,
    },
    label: {
        fontSize: FONTS.size.s,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.m,
        borderRadius: SPACING.s,
        fontSize: FONTS.size.m,
        color: COLORS.text,
        backgroundColor: COLORS.background,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.m,
        borderRadius: SPACING.s,
        alignItems: 'center',
        marginTop: SPACING.s,
        ...SHADOWS.small,
    },
    buttonText: {
        color: COLORS.surface,
        fontSize: FONTS.size.m,
        fontWeight: 'bold',
    },
});

export default ProfileSetupScreen;
