import toBook from "../mappers/BookMapper";

class BookSearchRepositoryImpl {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async search(query) {
    const docs = await this.dataSource.search(query);
    return docs.map(toBook);
  }

  async getTrending(period) {
    const docs = await this.dataSource.getTrending(period);
    return docs.map(toBook);
  }
}

export default BookSearchRepositoryImpl;
