import { useEffect, useState } from "react";
import { getBookDescriptionUseCase } from "../../../../core/di/injectionContainer";

function useBookDescription(workId) {
  const [description, setDescription] = useState(undefined);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    if (!workId) {
      setStatus("error");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    getBookDescriptionUseCase
      .execute(workId)
      .then((result) => {
        if (cancelled) return;
        setDescription(result);
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [workId]);

  return { description, status };
}

export default useBookDescription;
