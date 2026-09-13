import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "favourite-books";

// Stores one array of Book objects in AsyncStorage.
class AsyncStorageFavouritesDataSource {
  async getAll() {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async saveAll(books) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
}

export default AsyncStorageFavouritesDataSource;
