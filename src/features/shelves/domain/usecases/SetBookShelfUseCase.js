class SetBookShelfUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(book, shelf) {
    return this.repository.setShelf(book, shelf);
  }
}

export default SetBookShelfUseCase;
