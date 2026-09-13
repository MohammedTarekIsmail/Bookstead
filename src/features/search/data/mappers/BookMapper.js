import { OPEN_LIBRARY_COVERS_BASE_URL } from "../../../../core/config/openLibrary";

// Converts an OpenLibrarySearchDocModel into our domain Book entity.
function toBook(doc) {
  return {
    id: doc.key,
    title: doc.title,
    authors: doc.authorNames,
    coverUrl: doc.coverId
      ? `${OPEN_LIBRARY_COVERS_BASE_URL}/b/id/${doc.coverId}-M.jpg`
      : undefined,
    publishYear: doc.firstPublishYear,
    genres: doc.subjects.slice(0, 5),
  };
}

export default toBook;
