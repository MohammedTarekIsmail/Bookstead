class LookupBookByIsbnUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(isbn) {
    return this.repository.lookupByIsbn(isbn);
  }
}

export default LookupBookByIsbnUseCase;
