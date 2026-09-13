import { OPEN_LIBRARY_BASE_URL } from "../../../../core/config/openLibrary";
import OpenLibrarySearchDocModel from "../models/OpenLibrarySearchDocModel";

class OpenLibraryRemoteDataSource {
  async search(query) {
    const url = `${OPEN_LIBRARY_BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=20`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Open Library search failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.docs.map(OpenLibrarySearchDocModel.fromJson);
  }

  async getTrending(period) {
    const response = await fetch(`${OPEN_LIBRARY_BASE_URL}/trending/${period}.json`);

    if (!response.ok) {
      throw new Error(`Open Library trending fetch failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.works.map(OpenLibrarySearchDocModel.fromJson);
  }
}

export default OpenLibraryRemoteDataSource;
