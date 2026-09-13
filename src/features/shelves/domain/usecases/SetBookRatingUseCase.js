class SetBookRatingUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(bookId, rating) {
    return this.repository.setRating(bookId, rating);
  }
}

export default SetBookRatingUseCase;
