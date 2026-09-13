import { useEffect, useState } from "react";
import {
  getShelfStatusUseCase,
  removeBookFromShelfUseCase,
  setBookShelfUseCase,
} from "../../../../core/di/injectionContainer";

function useBookShelfStatus(book) {
  const [shelf, setShelf] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!book) {
      setStatus("error");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    getShelfStatusUseCase
      .execute(book.id)
      .then((result) => {
        if (cancelled) return;
        setShelf(result);
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [book]);

  // Tapping the already-active shelf removes the book; tapping a different
  // one adds it there (or moves it, if it was already on another shelf).
  async function selectShelf(nextShelf) {
    if (nextShelf === shelf) {
      await removeBookFromShelfUseCase.execute(book.id);
      setShelf(null);
    } else {
      await setBookShelfUseCase.execute(book, nextShelf);
      setShelf(nextShelf);
    }
  }

  return { shelf, status, selectShelf };
}

export default useBookShelfStatus;
