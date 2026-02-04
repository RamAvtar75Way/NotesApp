import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../App';
import NoteCard from '../components/NoteCard';
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';
import { getData, Note } from '../utils/storage';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddNote'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchNotes = async () => {
                const storedNotes = await getData<Note[]>('notes');
                if (storedNotes) {
                    // Sort notes by date (newest first)
                    const sortedNotes = storedNotes.sort((a, b) => Number(b.id) - Number(a.id));
                    setNotes(sortedNotes);
                }
            };
            fetchNotes();
        }, [])
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            {notes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="document-text-outline" size={64} color={COLORS.textSecondary} style={{ opacity: 0.5 }} />
                    <Text style={styles.emptyText}>No notes yet</Text>
                    <Text style={styles.emptySubText}>Tap the + button to create one</Text>
                </View>
            ) : (
                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NoteCard note={item} />}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddNote')}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={32} color={COLORS.surface} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    list: {
        padding: SPACING.m,
        paddingBottom: 100, // Space for FAB
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    emptyText: {
        fontSize: FONTS.size.xl,
        color: COLORS.text,
        fontWeight: 'bold',
        marginTop: SPACING.m,
    },
    emptySubText: {
        fontSize: FONTS.size.m,
        color: COLORS.textSecondary,
        marginTop: SPACING.s,
    },
    fab: {
        position: 'absolute',
        bottom: SPACING.xl,
        right: SPACING.xl,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
        elevation: 6,
    },
});

export default HomeScreen;
