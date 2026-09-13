import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getFavouriteBooksUseCase } from "../../../../core/di/injectionContainer";

function useFavouriteBooks() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("loading");

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setStatus("loading");

      getFavouriteBooksUseCase
        .execute()
        .then((result) => {
          if (cancelled) return;
          setBooks(result);
          setStatus("success");
        })
        .catch(() => {
          if (cancelled) return;
          setStatus("error");
        });

      return () => {
        cancelled = true;
      };
    }, [])
  );

  return { books, status };
}

export default useFavouriteBooks;
