class FavouritesRepositoryImpl {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getAll() {
    return this.dataSource.getAll();
  }

  async isFavourite(bookId) {
    const books = await this.dataSource.getAll();
    return books.some((book) => book.id === bookId);
  }

  // Returns the new favourite state (true if it just got added, false if removed).
  async toggleFavourite(book) {
    const books = await this.dataSource.getAll();
    const alreadyFavourite = books.some((entry) => entry.id === book.id);
    const updated = alreadyFavourite
      ? books.filter((entry) => entry.id !== book.id)
      : [...books, book];

    await this.dataSource.saveAll(updated);
    return !alreadyFavourite;
  }
}

export default FavouritesRepositoryImpl;
