import { useEffect, useState } from "react";
import { getFavouriteStatusUseCase, toggleFavouriteUseCase } from "../../../../core/di/injectionContainer";

function useFavouriteStatus(book) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!book) {
      setStatus("error");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    getFavouriteStatusUseCase
      .execute(book.id)
      .then((result) => {
        if (cancelled) return;
        setIsFavourite(result);
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

  async function toggle() {
    const nextValue = await toggleFavouriteUseCase.execute(book);
    setIsFavourite(nextValue);
  }

  return { isFavourite, status, toggle };
}

export default useFavouriteStatus;
