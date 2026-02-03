import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getData, Profile } from '../utils/storage';

const ProfileScreen: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const data = await getData<Profile>('profile');
            setProfile(data);
        };
        loadProfile();
    }, []);

    if (!profile) {
        return (
            <View style={styles.container}>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {profile.image && (
                <Image source={{ uri: profile.image }} style={styles.image} />
            )}
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{profile.name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profile.email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ProfileScreen;
