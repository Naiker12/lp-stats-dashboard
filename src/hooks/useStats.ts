import { useEffect, useState } from "react";

import { ApiError, type StatsResponse, getStats } from "../services/api";

type UseStatsState = {
  data: StatsResponse | null;
  loading: boolean;
  error: ApiError | Error | null;
};

export function useStats(codigo: string | undefined, from?: string, to?: string): UseStatsState {
  const [state, setState] = useState<UseStatsState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    setState((current) => ({ ...current, loading: true, error: null }));

    getStats(codigo, from, to)
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) {
          setState({ data: null, loading: false, error });
        }
      });

    return () => controller.abort();
  }, [codigo, from, to]);

  return state;
}
