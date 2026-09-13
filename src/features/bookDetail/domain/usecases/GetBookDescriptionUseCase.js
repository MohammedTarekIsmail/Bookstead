class GetBookDescriptionUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(workId) {
    return this.repository.getDescription(workId);
  }
}

export default GetBookDescriptionUseCase;
