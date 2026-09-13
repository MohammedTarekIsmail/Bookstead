class GetShelfStatusUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(bookId) {
    return this.repository.getShelfForBook(bookId);
  }
}

export default GetShelfStatusUseCase;
