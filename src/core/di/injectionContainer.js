import SearchBooksUseCase from "../../features/search/domain/usecases/SearchBooksUseCase";
import GetTrendingBooksUseCase from "../../features/search/domain/usecases/GetTrendingBooksUseCase";
import BookSearchRepositoryImpl from "../../features/search/data/repositories/BookSearchRepositoryImpl";
import OpenLibraryRemoteDataSource from "../../features/search/data/datasources/OpenLibraryRemoteDataSource";

import GetBookDescriptionUseCase from "../../features/bookDetail/domain/usecases/GetBookDescriptionUseCase";
import BookDetailRepositoryImpl from "../../features/bookDetail/data/repositories/BookDetailRepositoryImpl";
import OpenLibraryWorkRemoteDataSource from "../../features/bookDetail/data/datasources/OpenLibraryWorkRemoteDataSource";

import GetShelfBooksUseCase from "../../features/shelves/domain/usecases/GetShelfBooksUseCase";
import GetShelfStatusUseCase from "../../features/shelves/domain/usecases/GetShelfStatusUseCase";
import SetBookShelfUseCase from "../../features/shelves/domain/usecases/SetBookShelfUseCase";
import RemoveBookFromShelfUseCase from "../../features/shelves/domain/usecases/RemoveBookFromShelfUseCase";
import GetBookProgressUseCase from "../../features/shelves/domain/usecases/GetBookProgressUseCase";
import SetBookProgressUseCase from "../../features/shelves/domain/usecases/SetBookProgressUseCase";
import GetBookRatingUseCase from "../../features/shelves/domain/usecases/GetBookRatingUseCase";
import SetBookRatingUseCase from "../../features/shelves/domain/usecases/SetBookRatingUseCase";
import ShelfRepositoryImpl from "../../features/shelves/data/repositories/ShelfRepositoryImpl";
import AsyncStorageShelfDataSource from "../../features/shelves/data/datasources/AsyncStorageShelfDataSource";

import GetFavouriteBooksUseCase from "../../features/favourites/domain/usecases/GetFavouriteBooksUseCase";
import GetFavouriteStatusUseCase from "../../features/favourites/domain/usecases/GetFavouriteStatusUseCase";
import ToggleFavouriteUseCase from "../../features/favourites/domain/usecases/ToggleFavouriteUseCase";
import FavouritesRepositoryImpl from "../../features/favourites/data/repositories/FavouritesRepositoryImpl";
import AsyncStorageFavouritesDataSource from "../../features/favourites/data/datasources/AsyncStorageFavouritesDataSource";

import LookupBookByIsbnUseCase from "../../features/scanner/domain/usecases/LookupBookByIsbnUseCase";
import IsbnLookupRepositoryImpl from "../../features/scanner/data/repositories/IsbnLookupRepositoryImpl";
import OpenLibraryIsbnRemoteDataSource from "../../features/scanner/data/datasources/OpenLibraryIsbnRemoteDataSource";

const bookSearchRepository = new BookSearchRepositoryImpl(new OpenLibraryRemoteDataSource());

export const searchBooksUseCase = new SearchBooksUseCase(bookSearchRepository);
export const getTrendingBooksUseCase = new GetTrendingBooksUseCase(bookSearchRepository);

export const getBookDescriptionUseCase = new GetBookDescriptionUseCase(
  new BookDetailRepositoryImpl(new OpenLibraryWorkRemoteDataSource())
);

const shelfRepository = new ShelfRepositoryImpl(new AsyncStorageShelfDataSource());

export const getShelfBooksUseCase = new GetShelfBooksUseCase(shelfRepository);
export const getShelfStatusUseCase = new GetShelfStatusUseCase(shelfRepository);
export const setBookShelfUseCase = new SetBookShelfUseCase(shelfRepository);
export const removeBookFromShelfUseCase = new RemoveBookFromShelfUseCase(shelfRepository);
export const getBookProgressUseCase = new GetBookProgressUseCase(shelfRepository);
export const setBookProgressUseCase = new SetBookProgressUseCase(shelfRepository);
export const getBookRatingUseCase = new GetBookRatingUseCase(shelfRepository);
export const setBookRatingUseCase = new SetBookRatingUseCase(shelfRepository);

const favouritesRepository = new FavouritesRepositoryImpl(new AsyncStorageFavouritesDataSource());

export const getFavouriteBooksUseCase = new GetFavouriteBooksUseCase(favouritesRepository);
export const getFavouriteStatusUseCase = new GetFavouriteStatusUseCase(favouritesRepository);
export const toggleFavouriteUseCase = new ToggleFavouriteUseCase(favouritesRepository);

export const lookupBookByIsbnUseCase = new LookupBookByIsbnUseCase(
  new IsbnLookupRepositoryImpl(new OpenLibraryIsbnRemoteDataSource())
);
