import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';
import { getData, Profile } from '../utils/storage';

const ProfileScreen: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            const loadProfile = async () => {
                const data = await getData<Profile>('profile');
                setProfile(data);
            };
            loadProfile();
        }, [])
    );

    if (!profile) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.imageContainer}>
                    {profile.image ? (
                        <Image source={{ uri: profile.image }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Ionicons name="person" size={60} color={COLORS.textSecondary} />
                        </View>
                    )}
                </View>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.email}>{profile.email}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Details</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.icon} />
                        <View>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.value}>{profile.email}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.icon} />
                        <View>
                            <Text style={styles.label}>Username</Text>
                            <Text style={styles.value}>{profile.name}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>App Settings</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Ionicons name="moon-outline" size={20} color={COLORS.textSecondary} style={styles.icon} />
                        <Text style={styles.settingLabel}>Dark Mode</Text>
                        <Text style={styles.comingSoon}>Coming Soon</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.l,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    loadingText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.size.m,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
        marginTop: SPACING.m,
    },
    imageContainer: {
        ...SHADOWS.medium,
        marginBottom: SPACING.m,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: COLORS.surface,
    },
    placeholderImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.border,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    email: {
        fontSize: FONTS.size.m,
        color: COLORS.textSecondary,
    },
    section: {
        marginBottom: SPACING.l,
    },
    sectionTitle: {
        fontSize: FONTS.size.m,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: SPACING.s,
        marginLeft: SPACING.xs,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: SPACING.m,
        padding: SPACING.m,
        ...SHADOWS.small,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.s,
    },
    icon: {
        marginRight: SPACING.m,
    },
    label: {
        fontSize: FONTS.size.s,
        color: COLORS.textSecondary,
    },
    value: {
        fontSize: FONTS.size.m,
        color: COLORS.text,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.s,
        marginLeft: 36, // Align with text start
    },
    settingLabel: {
        flex: 1,
        fontSize: FONTS.size.m,
        color: COLORS.text,
    },
    comingSoon: {
        fontSize: FONTS.size.s,
        color: COLORS.primary,
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.s,
        paddingVertical: SPACING.xs,
        borderRadius: SPACING.s,
        overflow: 'hidden',
    },
});

export default ProfileScreen;
