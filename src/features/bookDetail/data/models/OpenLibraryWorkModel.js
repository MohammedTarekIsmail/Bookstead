// Parses the raw shape returned by openlibrary.org/works/{id}.json into
// clean, named fields.
class OpenLibraryWorkModel {
  constructor({ key, title, description }) {
    this.key = key;
    this.title = title;
    this.description = description;
  }

  static fromJson(json) {
    return new OpenLibraryWorkModel({
      key: json.key,
      title: json.title,
      description: normalizeDescription(json.description),
    });
  }
}

export default OpenLibraryWorkModel;

function normalizeDescription(description) {
  if (typeof description === "string") {
    return description;
  }

  if (description && typeof description === "object") {
    return description.value;
  }

  return undefined;
}
