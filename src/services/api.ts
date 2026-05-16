export type DailyEntry = {
  fecha: string;
  clicks: number;
};

export type StatsResponse = {
  codigo: string;
  total_clicks: number;
  daily: DailyEntry[];
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is required");
}

export async function getStats(codigo: string, from?: string, to?: string): Promise<StatsResponse> {
  const url = new URL(`/stats/${encodeURIComponent(codigo)}`, apiUrl);

  if (from) {
    url.searchParams.set("from", from);
  }

  if (to) {
    url.searchParams.set("to", to);
  }

  const response = await fetch(url);

  if (!response.ok) {
    let message = "No se pudieron cargar las estadisticas.";

    try {
      const body = (await response.json()) as { message?: string; error?: string };
      message = body.message ?? body.error ?? message;
    } catch {
      message = response.statusText || message;
    }

    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<StatsResponse>;
}
