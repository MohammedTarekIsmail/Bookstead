// Parses the raw shape returned by openlibrary.org's search and trending
// endpoints into clean, named fields. This is the only file that needs to
// know Open Library calls things author_name, cover_i, first_publish_year.
class OpenLibrarySearchDocModel {
  constructor({ key, title, authorNames, coverId, firstPublishYear, subjects }) {
    this.key = key;
    this.title = title;
    this.authorNames = authorNames;
    this.coverId = coverId;
    this.firstPublishYear = firstPublishYear;
    this.subjects = subjects;
  }

  static fromJson(json) {
    return new OpenLibrarySearchDocModel({
      key: json.key,
      title: json.title,
      authorNames: json.author_name ?? [],
      coverId: json.cover_i,
      firstPublishYear: json.first_publish_year,
      subjects: json.subject ?? [],
    });
  }
}

export default OpenLibrarySearchDocModel;
