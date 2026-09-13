import toBook from "../mappers/BookMapper";

class IsbnLookupRepositoryImpl {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async lookupByIsbn(isbn) {
    const doc = await this.dataSource.lookupByIsbn(isbn);
    return doc ? toBook(doc) : null;
  }
}

export default IsbnLookupRepositoryImpl;
