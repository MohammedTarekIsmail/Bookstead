class ToggleFavouriteUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(book) {
    return this.repository.toggleFavourite(book);
  }
}

export default ToggleFavouriteUseCase;
