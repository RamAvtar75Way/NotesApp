import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Profile {
    name: string;
    email: string;
    image: string | null;
}

export interface NoteLocation {
    latitude: number;
    longitude: number;
}

export interface Note {
    id: string;
    title: string;
    description: string;
    image: string | null;
    location: NoteLocation | null;
    isPinned?: boolean;
}

export const storeData = async (key: string, value: any): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // error saving value
    }
};

export const getData = async <T>(key: string): Promise<T | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return null;
    }
};

export const removeData = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        // error removing value
    }
};
