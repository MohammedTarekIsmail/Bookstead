// Converts an OpenLibraryIsbnLookupModel into our domain Book entity.
// doc.key is a real Open Library edition key (e.g. "/books/OL30036715M") —
// same idea as Search's work keys, and it's directly fetchable by
// useBookDescription, since edition records carry their own description too.
function toBook(doc) {
  return {
    id: doc.key,
    title: doc.title,
    authors: doc.authorNames,
    coverUrl: doc.coverUrl,
    pageCount: doc.pageCount,
    genres: doc.subjects.slice(0, 5),
  };
}

export default toBook;
