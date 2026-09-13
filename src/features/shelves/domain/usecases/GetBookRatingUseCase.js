class GetBookRatingUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(bookId) {
    return this.repository.getRatingForBook(bookId);
  }
}

export default GetBookRatingUseCase;
