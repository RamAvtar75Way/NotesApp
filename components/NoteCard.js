import { Image, StyleSheet, Text, View } from 'react-native';

const NoteCard = ({ note }) => {
    return (
        <View style={styles.card}>
            {note.image && <Image source={{ uri: note.image }} style={styles.image} />}
            <View style={styles.content}>
                <Text style={styles.text}>{note.text}</Text>
                {note.location && (
                    <Text style={styles.location}>
                        Lat: {note.location.latitude?.toFixed(4)}, Long: {note.location.longitude?.toFixed(4)}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    content: {
        padding: 12,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    location: {
        fontSize: 12,
        color: '#666',
    },
});

export default NoteCard;
