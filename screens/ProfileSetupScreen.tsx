import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../App';
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
        <View style={styles.container}>
            <Text style={styles.header}>Create Profile</Text>

            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text>Pick Image</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Button title="Save Profile" onPress={saveProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    imageContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
});

export default ProfileSetupScreen;
