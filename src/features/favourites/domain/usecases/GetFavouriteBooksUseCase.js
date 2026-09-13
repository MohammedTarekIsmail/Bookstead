class GetFavouriteBooksUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute() {
    return this.repository.getAll();
  }
}

export default GetFavouriteBooksUseCase;
