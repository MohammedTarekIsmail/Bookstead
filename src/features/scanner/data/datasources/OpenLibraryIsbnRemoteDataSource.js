import { OPEN_LIBRARY_BASE_URL } from "../../../../core/config/openLibrary";
import OpenLibraryIsbnLookupModel from "../models/OpenLibraryIsbnLookupModel";

class OpenLibraryIsbnRemoteDataSource {
  // Returns null if no book is found for this ISBN
  async lookupByIsbn(isbn) {
    const url = `${OPEN_LIBRARY_BASE_URL}/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Open Library ISBN lookup failed with status ${response.status}`);
    }

    const data = await response.json();
    const json = data[`ISBN:${isbn}`];
    return json ? OpenLibraryIsbnLookupModel.fromJson(json) : null;
  }
}

export default OpenLibraryIsbnRemoteDataSource;
