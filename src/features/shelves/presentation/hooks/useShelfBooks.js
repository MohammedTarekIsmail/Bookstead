import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getShelfBooksUseCase } from "../../../../core/di/injectionContainer";

function useShelfBooks(shelf) {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("loading");

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setStatus("loading");

      getShelfBooksUseCase
        .execute(shelf)
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
    }, [shelf])
  );

  return { books, status };
}

export default useShelfBooks;
