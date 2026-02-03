import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import NoteCard from '../components/NoteCard';
import { getData } from '../utils/storage';

const HomeScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchNotes = async () => {
                const storedNotes = await getData('notes');
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
