class RemoveBookFromShelfUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(bookId) {
    return this.repository.removeFromShelf(bookId);
  }
}

export default RemoveBookFromShelfUseCase;
