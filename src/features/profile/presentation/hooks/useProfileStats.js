import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getShelfBooksUseCase } from "../../../../core/di/injectionContainer";
import { SHELVES } from "../../../../core/constants/shelves";

function useProfileStats() {
  const [counts, setCounts] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState("loading");

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setStatus("loading");

      Promise.all(SHELVES.map((shelf) => getShelfBooksUseCase.execute(shelf.key)))
        .then((results) => {
          if (cancelled) return;
          const nextCounts = {};
          let total = 0;
          SHELVES.forEach((shelf, index) => {
            nextCounts[shelf.key] = results[index].length;
            total += results[index].length;
          });
          setCounts(nextCounts);
          setTotalCount(total);
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

  return { counts, totalCount, status };
}

export default useProfileStats;
