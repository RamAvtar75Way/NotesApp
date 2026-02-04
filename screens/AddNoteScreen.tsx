import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootStackParamList } from '../App';
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';
import { getData, Note, NoteLocation, storeData } from '../utils/storage';

type AddNoteScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddNote'
>;

interface Props {
    navigation: AddNoteScreenNavigationProp;
}

const AddNoteScreen: React.FC<Props> = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<NoteLocation | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const pickImage = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        const { status } =
            await Location.requestForegroundPermissionsAsync();

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
        } catch {
            Alert.alert('Error', 'Could not fetch location');
        } finally {
            setLoadingLocation(false);
        }
    };

    const saveNote = async () => {
        if (!title.trim() && !description.trim()) {
            Alert.alert('Error', 'Please enter a title or description');
            return;
        }

        const newNote: Note = {
            id: Date.now().toString(),
            title,
            description,
            image,
            location,
        };

        const existingNotes = (await getData<Note[]>('notes')) || [];
        await storeData('notes', [...existingNotes, newNote]);

        navigation.goBack();
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* EDITOR CARD */}
            <View style={styles.editorCard}>
                <TextInput
                    style={styles.inputTitle}
                    placeholder="Note title..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={title}
                    onChangeText={setTitle}
                    maxLength={50}
                />

                <View style={styles.titleDivider} />

                <TextInput
                    style={styles.inputDescription}
                    placeholder="Start writing your note..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </View>

            {/* IMAGE PREVIEW */}
            {image && (
                <View style={styles.imageCard}>
                    <Image source={{ uri: image }} style={styles.previewImage} />

                    <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => setImage(null)}
                    >
                        <Ionicons name="close" size={18} color={COLORS.surface} />
                    </TouchableOpacity>
                </View>
            )}

            {/* LOCATION CHIP */}
            {location && (
                <View style={styles.locationChip}>
                    <Ionicons name="location" size={16} color={COLORS.primary} />
                    <Text style={styles.locationText}>
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </Text>
                    <TouchableOpacity onPress={() => setLocation(null)}>
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={COLORS.textSecondary}
                        />
                    </TouchableOpacity>
                </View>
            )}

            {/* TOOLBAR */}
            <View style={styles.toolbar}>
                <TouchableOpacity style={styles.toolButton} onPress={pickImage}>
                    <Ionicons name="image-outline" size={22} color={COLORS.primary} />
                    <Text style={styles.toolText}>Image</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.toolButton}
                    onPress={getLocation}
                    disabled={loadingLocation}
                >
                    {loadingLocation ? (
                        <ActivityIndicator size="small" color={COLORS.primary} />
                    ) : (
                        <>
                            <Ionicons
                                name="location-outline"
                                size={22}
                                color={COLORS.primary}
                            />
                            <Text style={styles.toolText}>Location</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            {/* SAVE BUTTON */}
            <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
                <Ionicons name="save-outline" size={20} color={COLORS.surface} />
                <Text style={styles.saveButtonText}>Save Note</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.m,
        paddingBottom: SPACING.xl,
    },

    editorCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: SPACING.l,
        marginBottom: SPACING.m,
        minHeight: 200,
        ...SHADOWS.medium,
    },

    inputTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.text,
    },

    titleDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.m,
    },

    inputDescription: {
        fontSize: FONTS.size.m,
        color: COLORS.text,
        minHeight: 140,
        textAlignVertical: 'top',
        lineHeight: 22,
    },

    imageCard: {
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: SPACING.m,
        ...SHADOWS.medium,
    },

    previewImage: {
        width: '100%',
        height: 220,
    },

    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.error,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },

    locationChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: COLORS.surface,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: COLORS.primary,
        ...SHADOWS.small,
    },

    locationText: {
        fontSize: FONTS.size.s,
        color: COLORS.text,
    },

    toolbar: {
        flexDirection: 'row',
        gap: SPACING.m,
        marginBottom: SPACING.xl,
    },

    toolButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 14,
        ...SHADOWS.small,
    },

    toolText: {
        fontSize: FONTS.size.s,
        color: COLORS.primary,
        fontWeight: '600',
    },

    saveButton: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
    },

    saveButtonText: {
        color: COLORS.surface,
        fontSize: FONTS.size.m,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});
