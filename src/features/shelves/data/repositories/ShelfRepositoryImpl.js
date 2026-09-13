class ShelfRepositoryImpl {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async getBooksByShelf(shelf) {
    const entries = await this.dataSource.getAll();
    return entries.filter((entry) => entry.shelf === shelf).map((entry) => entry.book);
  }

  async getShelfForBook(bookId) {
    const entries = await this.dataSource.getAll();
    const entry = entries.find((entry) => entry.book.id === bookId);
    return entry ? entry.shelf : null;
  }

  async setShelf(book, shelf) {
    const entries = await this.dataSource.getAll();
    const existing = entries.find((entry) => entry.book.id === book.id);
    const withoutBook = entries.filter((entry) => entry.book.id !== book.id);
    // Finishing a book always means 100% read; otherwise keep whatever
    // progress it already had (0 if it's new to shelves entirely). Rating
    // is always preserved as-is, regardless of which shelf it moves to.
    const progress = shelf === "finished" ? 100 : (existing?.progress ?? 0);
    const rating = existing?.rating ?? 0;
    await this.dataSource.saveAll([...withoutBook, { book, shelf, progress, rating }]);
  }

  async removeFromShelf(bookId) {
    const entries = await this.dataSource.getAll();
    const withoutBook = entries.filter((entry) => entry.book.id !== bookId);
    await this.dataSource.saveAll(withoutBook);
  }

  async getProgressForBook(bookId) {
    const entries = await this.dataSource.getAll();
    const entry = entries.find((entry) => entry.book.id === bookId);
    return entry ? (entry.progress ?? 0) : 0;
  }

  async setProgress(bookId, progress) {
    const entries = await this.dataSource.getAll();
    const updated = entries.map((entry) =>
      entry.book.id === bookId ? { ...entry, progress } : entry
    );
    await this.dataSource.saveAll(updated);
  }

  async getRatingForBook(bookId) {
    const entries = await this.dataSource.getAll();
    const entry = entries.find((entry) => entry.book.id === bookId);
    return entry ? (entry.rating ?? 0) : 0;
  }

  async setRating(bookId, rating) {
    const entries = await this.dataSource.getAll();
    const updated = entries.map((entry) =>
      entry.book.id === bookId ? { ...entry, rating } : entry
    );
    await this.dataSource.saveAll(updated);
  }
}

export default ShelfRepositoryImpl;
