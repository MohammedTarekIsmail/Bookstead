class SetBookProgressUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(bookId, progress) {
    return this.repository.setProgress(bookId, progress);
  }
}

export default SetBookProgressUseCase;
