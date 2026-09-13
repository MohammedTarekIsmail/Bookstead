import { useEffect, useState } from "react";
import { getBookProgressUseCase, setBookProgressUseCase } from "../../../../core/di/injectionContainer";

function useBookProgress(bookId) {
  const [progress, setProgressState] = useState(0);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    getBookProgressUseCase
      .execute(bookId)
      .then((result) => {
        if (cancelled) return;
        setProgressState(result);
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

  async function updateProgress(value) {
    setProgressState(value);
    await setBookProgressUseCase.execute(bookId, value);
  }

  return { progress, status, updateProgress };
}

export default useBookProgress;
