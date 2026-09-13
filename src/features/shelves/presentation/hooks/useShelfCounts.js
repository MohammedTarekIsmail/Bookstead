import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getShelfBooksUseCase } from "../../../../core/di/injectionContainer";
import { SHELVES } from "../../../../core/constants/shelves";

// useFocusEffect (from React Navigation) works like useEffect, but re-runs
// every time this screen comes back into view — not just on first mount.
// That's what makes the counts refresh after adding a book from Book Detail
// and navigating back here.
function useShelfCounts() {
  const [counts, setCounts] = useState({});
  const [status, setStatus] = useState("loading");

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setStatus("loading");

      Promise.all(SHELVES.map((shelf) => getShelfBooksUseCase.execute(shelf.key)))
        .then((results) => {
          if (cancelled) return;
          const nextCounts = {};
          SHELVES.forEach((shelf, index) => {
            nextCounts[shelf.key] = results[index].length;
          });
          setCounts(nextCounts);
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

  return { counts, status };
}

export default useShelfCounts;
