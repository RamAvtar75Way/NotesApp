import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../App';
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';
import { getData, Note, NoteLocation, storeData } from '../utils/storage';

type AddNoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddNote'>;

interface Props {
    navigation: AddNoteScreenNavigationProp;
}

const AddNoteScreen: React.FC<Props> = ({ navigation }) => {
    const [text, setText] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<NoteLocation | null>(null);
    const [loadingLocation, setLoadingLocation] = useState<boolean>(false);

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
        setLoadingLocation(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLoadingLocation(false);
            Alert.alert('Permission needed', 'Location permissions are required!');
            return;
        }
        try {
            const loc = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
        } catch (error) {
            Alert.alert('Error', 'Could not fetch location');
        } finally {
            setLoadingLocation(false);
        }
    };

    const saveNote = async () => {
        if (!text.trim()) {
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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="What's on your mind?"
                    placeholderTextColor={COLORS.textSecondary}
                    value={text}
                    onChangeText={setText}
                    multiline
                    autoFocus
                />
            </View>

            {image && (
                <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: image }} style={styles.previewImage} />
                    <TouchableOpacity style={styles.removeImageButton} onPress={() => setImage(null)}>
                        <Ionicons name="close-circle" size={24} color={COLORS.error} />
                    </TouchableOpacity>
                </View>
            )}

            {location && (
                <View style={styles.locationChip}>
                    <Ionicons name="location" size={16} color={COLORS.primary} />
                    <Text style={styles.locationText}>
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </Text>
                    <TouchableOpacity onPress={() => setLocation(null)} style={{ marginLeft: 8 }}>
                        <Ionicons name="close" size={16} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.toolbar}>
                <TouchableOpacity style={styles.toolbarButton} onPress={pickImage}>
                    <Ionicons name="image-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.toolbarButton} onPress={getLocation} disabled={loadingLocation}>
                    {loadingLocation ? (
                        <ActivityIndicator size="small" color={COLORS.primary} />
                    ) : (
                        <Ionicons name="location-outline" size={24} color={COLORS.primary} />
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
                <Text style={styles.saveButtonText}>Save Note</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.m,
    },
    inputContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: SPACING.m,
        padding: SPACING.m,
        minHeight: 150,
        marginBottom: SPACING.m,
        ...SHADOWS.small,
    },
    input: {
        fontSize: FONTS.size.m,
        color: COLORS.text,
        textAlignVertical: 'top',
        minHeight: 120,
    },
    imagePreviewContainer: {
        marginBottom: SPACING.m,
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: SPACING.m,
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
    },
    locationChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        alignSelf: 'flex-start',
        padding: SPACING.s,
        borderRadius: SPACING.l,
        marginBottom: SPACING.m,
        ...SHADOWS.small,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    locationText: {
        marginLeft: SPACING.xs,
        color: COLORS.text,
        fontSize: FONTS.size.s,
    },
    toolbar: {
        flexDirection: 'row',
        marginBottom: SPACING.xl,
    },
    toolbarButton: {
        backgroundColor: COLORS.surface,
        padding: SPACING.s,
        borderRadius: SPACING.m,
        marginRight: SPACING.m,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        padding: SPACING.m,
        borderRadius: SPACING.m,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    saveButtonText: {
        color: COLORS.surface,
        fontSize: FONTS.size.m,
        fontWeight: 'bold',
    },
});

export default AddNoteScreen;
