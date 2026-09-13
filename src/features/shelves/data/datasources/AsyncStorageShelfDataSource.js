import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "shelved-books";

// Stores one array in AsyncStorage: [{ book, shelf }, ...]
// AsyncStorage only stores strings, so every read/write goes through
// JSON.parse/JSON.stringify — this is the only file that needs to know that.
class AsyncStorageShelfDataSource {
  async getAll() {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async saveAll(entries) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
}

export default AsyncStorageShelfDataSource;
