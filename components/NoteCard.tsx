import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';
import { Note } from '../utils/storage';

interface NoteCardProps {
    note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    return (
        <View style={styles.card}>
            {note.image && <Image source={{ uri: note.image }} style={styles.image} />}
            <View style={styles.content}>
                <Text style={styles.text}>{note.text}</Text>
                {note.location && (
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-sharp" size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
                        <Text style={styles.location}>
                            {note.location.latitude?.toFixed(4)}, {note.location.longitude?.toFixed(4)}
                        </Text>
                    </View>
                )}
            </View>
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
    text: {
        fontSize: FONTS.size.m,
        color: COLORS.text,
        marginBottom: SPACING.s,
        lineHeight: 22,
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
});

export default NoteCard;
