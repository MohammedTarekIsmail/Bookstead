import { useEffect, useState } from "react";
import { getTrendingBooksUseCase, searchBooksUseCase } from "../../../../core/di/injectionContainer";

const DEBOUNCE_MS = 400;
const TRENDING_PERIODS = ["daily", "weekly", "monthly"];

function useSearchBooks() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  const [trending, setTrending] = useState({ daily: [], weekly: [], monthly: [] });
  const [trendingStatus, setTrendingStatus] = useState("loading");
  const [expandedPeriod, setExpandedPeriod] = useState(null); // null | "daily" | "weekly" | "monthly"

  // Load all 3 trending periods once, to fill the screen before any search.
  useEffect(() => {
    let cancelled = false;

    Promise.all(TRENDING_PERIODS.map((period) => getTrendingBooksUseCase.execute(period)))
      .then(([daily, weekly, monthly]) => {
        if (cancelled) return;
        setTrending({ daily, weekly, monthly });
        setTrendingStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setTrendingStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced search whenever the user types.
  useEffect(() => {
    if (query.trim().length === 0) {
      return;
    }

    setStatus("loading");

    const timeoutId = setTimeout(async () => {
      try {
        const books = await searchBooksUseCase.execute(query);
        setResults(books);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    status,
    trending,
    trendingStatus,
    expandedPeriod,
    setExpandedPeriod,
  };
}

export default useSearchBooks;
