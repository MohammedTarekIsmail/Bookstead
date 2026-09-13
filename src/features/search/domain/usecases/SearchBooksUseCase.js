class SearchBooksUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(query) {
    return this.repository.search(query);
  }
}

export default SearchBooksUseCase;
