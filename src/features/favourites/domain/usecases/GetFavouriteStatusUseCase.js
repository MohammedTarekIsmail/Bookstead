class GetFavouriteStatusUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(bookId) {
    return this.repository.isFavourite(bookId);
  }
}

export default GetFavouriteStatusUseCase;
