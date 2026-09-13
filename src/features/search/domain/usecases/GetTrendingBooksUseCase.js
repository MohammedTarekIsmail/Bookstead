class GetTrendingBooksUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(period) {
    return this.repository.getTrending(period);
  }
}

export default GetTrendingBooksUseCase;
