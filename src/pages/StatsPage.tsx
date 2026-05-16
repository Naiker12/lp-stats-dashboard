import { AlertCircle, ExternalLink, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { DateRangePicker } from "../components/DateRangePicker";
import { EmptyState } from "../components/EmptyState";
import { KpiCards } from "../components/KpiCards";
import { StatsChart } from "../components/StatsChart";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useStats } from "../hooks/useStats";

function toInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function defaultDateRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 29);

  return {
    from: toInputDate(from),
    to: toInputDate(to),
  };
}

export function StatsPage() {
  const { codigo } = useParams();
  const initialRange = useMemo(defaultDateRange, []);
  const [dateRange, setDateRange] = useState(initialRange);
  const { data, loading, error } = useStats(codigo, dateRange.from, dateRange.to);

  const hasDailyData = Boolean(data?.daily.length);

  return (
    <main className="dashboard-shell">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-2 gap-2" variant="secondary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Dashboard de estadisticas
            </Badge>
            <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">Codigo {codigo}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Lectura diaria del endpoint de estadisticas para monitorear visitas, picos y actividad reciente.
            </p>
          </div>

          <DateRangePicker
            from={dateRange.from}
            onChange={(from, to) => setDateRange({ from, to })}
            to={dateRange.to}
          />
        </header>

        {loading ? (
          <Card>
            <CardContent className="flex min-h-96 items-center justify-center gap-3 p-8 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Cargando estadisticas
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="border-destructive/40">
            <CardContent className="flex min-h-72 flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-base font-semibold">No se pudieron cargar los datos</h2>
                <p className="mt-1 max-w-lg text-sm text-muted-foreground">{error.message}</p>
              </div>
              <Button onClick={() => setDateRange({ ...dateRange })} variant="outline">
                Reintentar
              </Button>
            </CardContent>
          </Card>
        ) : data && hasDailyData ? (
          <>
            <KpiCards daily={data.daily} totalClicks={data.total_clicks} />
            <StatsChart daily={data.daily} />
          </>
        ) : (
          <EmptyState codigo={codigo ?? ""} />
        )}

        <footer className="mt-auto flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            API configurada por <code className="rounded bg-muted px-1 py-0.5">VITE_API_URL</code>
          </span>
          <Separator className="hidden h-4 w-px sm:block" />
          <a
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            href={`/stats/${codigo ?? ""}`}
          >
            Ruta SPA activa
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </footer>
      </div>
    </main>
  );
}
