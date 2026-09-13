// Parses the raw shape returned by
// openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data
class OpenLibraryIsbnLookupModel {
  constructor({ key, title, authorNames, coverUrl, pageCount, subjects }) {
    this.key = key;
    this.title = title;
    this.authorNames = authorNames;
    this.coverUrl = coverUrl;
    this.pageCount = pageCount;
    this.subjects = subjects;
  }

  static fromJson(json) {
    return new OpenLibraryIsbnLookupModel({
      key: json.key,
      title: json.title,
      authorNames: (json.authors ?? []).map((author) => author.name),
      coverUrl: json.cover?.medium,
      pageCount: json.number_of_pages,
      subjects: (json.subjects ?? []).map((subject) => subject.name),
    });
  }
}

export default OpenLibraryIsbnLookupModel;
