import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
import NoteCard from '../components/NoteCard';
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
                    setNotes(storedNotes);
                }
            };
            fetchNotes();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Button title="Create New Note" onPress={() => navigation.navigate('AddNote')} />
            {notes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text>No notes yet. Create one!</Text>
                </View>
            ) : (
                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NoteCard note={item} />}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    list: {
        paddingBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
