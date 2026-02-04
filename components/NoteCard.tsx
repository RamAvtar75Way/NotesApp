import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';
import { Note } from '../utils/storage';

interface NoteCardProps {
    note: Note;
    onPinPress?: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onPinPress }) => {
    return (
        <View style={styles.card}>
            {note.image && <Image source={{ uri: note.image }} style={styles.image} />}
            <View style={styles.content}>
                {note.title ? <Text style={styles.title}>{note.title}</Text> : null}
                <Text style={styles.description} numberOfLines={3}>
                    {note.description || (note as any).text || ''}
                </Text>
                {note.location && (
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-sharp" size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
                        <Text style={styles.location}>
                            {note.location.latitude?.toFixed(4)}, {note.location.longitude?.toFixed(4)}
                        </Text>
                    </View>
                )}
            </View>
            {onPinPress && (
                <TouchableOpacity style={styles.pinButton} onPress={() => onPinPress(note)}>
                    <Ionicons
                        name={note.isPinned ? "pin" : "pin-outline"}
                        size={20}
                        color={note.isPinned ? COLORS.primary : COLORS.textSecondary}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: SPACING.m,
        marginBottom: SPACING.m,
        overflow: 'hidden',
        ...SHADOWS.small,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    content: {
        padding: SPACING.m,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    description: {
        fontSize: FONTS.size.m,
        color: COLORS.textSecondary,
        marginBottom: SPACING.s,
        lineHeight: 20,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.xs,
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.s,
        paddingVertical: SPACING.xs,
        borderRadius: SPACING.s,
        alignSelf: 'flex-start',
    },
    location: {
        fontSize: FONTS.size.s,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    pinButton: {
        position: 'absolute',
        top: SPACING.m,
        right: SPACING.m,
        backgroundColor: COLORS.surface,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
});

export default NoteCard;
