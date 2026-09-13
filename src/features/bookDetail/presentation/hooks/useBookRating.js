import { useEffect, useState } from "react";
import { getBookRatingUseCase, setBookRatingUseCase } from "../../../../core/di/injectionContainer";

function useBookRating(bookId) {
  const [rating, setRatingState] = useState(0);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    getBookRatingUseCase
      .execute(bookId)
      .then((result) => {
        if (cancelled) return;
        setRatingState(result);
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [bookId]);

  // Tapping the star that already matches the current rating clears it back
  // to 0, instead of just re-setting the same value — same toggle-off idea
  // as the shelf buttons.
  async function updateRating(value) {
    const nextRating = value === rating ? 0 : value;
    setRatingState(nextRating);
    await setBookRatingUseCase.execute(bookId, nextRating);
  }

  return { rating, status, updateRating };
}

export default useBookRating;
