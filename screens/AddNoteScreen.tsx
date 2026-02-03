import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../App';
import { getData, Note, NoteLocation, storeData } from '../utils/storage';

type AddNoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddNote'>;

interface Props {
    navigation: AddNoteScreenNavigationProp;
}

const AddNoteScreen: React.FC<Props> = ({ navigation }) => {
    const [text, setText] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<NoteLocation | null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Camera roll permissions are required!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Location permissions are required!');
            return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
        });
    };

    const saveNote = async () => {
        if (!text) {
            Alert.alert('Error', 'Please enter some text');
            return;
        }

        const newNote: Note = {
            id: Date.now().toString(),
            text,
            image,
            location,
        };

        const existingNotes = (await getData<Note[]>('notes')) || [];
        const updatedNotes = [...existingNotes, newNote];
        await storeData('notes', updatedNotes);
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Write your note..."
                value={text}
                onChangeText={setText}
                multiline
            />

            <View style={styles.buttonGroup}>
                <Button title="Pick Image" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.previewImage} />}
            </View>

            <View style={styles.buttonGroup}>
                <Button title="Get Location" onPress={getLocation} />
                {location && (
                    <Text style={styles.locationText}>
                        Lat: {location.latitude}, Long: {location.longitude}
                    </Text>
                )}
            </View>

            <Button title="Save Note" onPress={saveNote} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        minHeight: 100,
        marginBottom: 20,
        textAlignVertical: 'top',
        borderRadius: 5,
    },
    buttonGroup: {
        marginBottom: 20,
    },
    previewImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    locationText: {
        marginTop: 5,
        color: '#666',
    },
});

export default AddNoteScreen;
