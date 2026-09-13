import { OPEN_LIBRARY_BASE_URL } from "../../../../core/config/openLibrary";
import OpenLibraryWorkModel from "../models/OpenLibraryWorkModel";

class OpenLibraryWorkRemoteDataSource {
  async getWork(workId) {
    const response = await fetch(`${OPEN_LIBRARY_BASE_URL}${workId}.json`);

    if (!response.ok) {
      throw new Error(`Open Library work fetch failed with status ${response.status}`);
    }

    const json = await response.json();
    return OpenLibraryWorkModel.fromJson(json);
  }
}

export default OpenLibraryWorkRemoteDataSource;
