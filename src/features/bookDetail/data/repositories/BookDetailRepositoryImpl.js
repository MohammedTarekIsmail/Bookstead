class BookDetailRepositoryImpl {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async getDescription(workId) {
    const work = await this.dataSource.getWork(workId);
    return work.description;
  }
}

export default BookDetailRepositoryImpl;
