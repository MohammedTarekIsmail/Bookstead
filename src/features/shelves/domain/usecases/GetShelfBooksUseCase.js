class GetShelfBooksUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(shelf) {
    return this.repository.getBooksByShelf(shelf);
  }
}

export default GetShelfBooksUseCase;
