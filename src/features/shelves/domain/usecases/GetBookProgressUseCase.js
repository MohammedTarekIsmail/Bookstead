class GetBookProgressUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(bookId) {
    return this.repository.getProgressForBook(bookId);
  }
}

export default GetBookProgressUseCase;
