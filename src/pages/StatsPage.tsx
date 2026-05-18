import { AlertCircle, ArrowLeft, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { DateRangePicker } from "../components/DateRangePicker";
import { EmptyState } from "../components/EmptyState";
import { KpiCards } from "../components/KpiCards";
import { RecentActivityTable } from "../components/RecentActivityTable";
import { StatsChart } from "../components/StatsChart";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useStats } from "../hooks/useStats";

function toInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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

function buildDailyRange(
  daily: Array<{ fecha: string; clicks: number }> | undefined,
  from: string,
  to: string,
) {
  if (!from || !to) {
    return daily ?? [];
  }

  const byDate = new Map((daily ?? []).map((entry) => [entry.fecha, entry.clicks]));
  const result: Array<{ fecha: string; clicks: number }> = [];
  const cursor = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);

  while (cursor <= end) {
    const fecha = toInputDate(cursor);
    result.push({ fecha, clicks: byDate.get(fecha) ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

export function StatsPage() {
  const { codigo } = useParams();
  const initialRange = useMemo(defaultDateRange, []);
  const [dateRange, setDateRange] = useState(initialRange);
  const [nextCode, setNextCode] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useStats(codigo, dateRange.from, dateRange.to);

  const hasDailyData = Boolean(data?.daily.length);
  const chartDaily = useMemo(
    () => buildDailyRange(data?.daily, dateRange.from, dateRange.to),
    [data?.daily, dateRange.from, dateRange.to],
  );

  return (
    <main className="dashboard-shell">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[92rem] flex-col gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-10 xl:px-12 2xl:max-w-[104rem]">
        <nav className="animate-soft-in flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link className="flex w-fit items-center gap-3" to="/">
            <img alt="LinkPilot Estadisticas" className="brand-mark h-10 w-10 rounded-md" src="/logo.svg" />
            <div>
              <p className="text-sm font-semibold leading-none">LinkPilot Estadisticas</p>
              <p className="mt-1 text-xs text-muted-foreground">Estadisticas de enlaces</p>
            </div>
          </Link>
          <form
            className="flex w-full gap-2 sm:w-auto"
            onSubmit={(event) => {
              event.preventDefault();
              const value = nextCode.trim();
              if (value) {
                navigate(`/stats/${encodeURIComponent(value)}`);
                setNextCode("");
              }
            }}
          >
            <Input
              aria-label="Consultar otro codigo"
              className="h-10 w-full border-white/10 bg-white/[0.04] text-foreground placeholder:text-zinc-500 sm:w-52"
              onChange={(event) => setNextCode(event.target.value)}
              placeholder="Otro codigo"
              value={nextCode}
            />
            <Button aria-label="Consultar" className="h-10 px-3" type="submit" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </nav>

        <div className="animate-fade-up flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link className="inline-flex items-center gap-1 hover:text-foreground" to="/">
            <ArrowLeft className="h-3.5 w-3.5" />
            Inicio
          </Link>
          <span>/</span>
          <span>Estadisticas</span>
          <span>/</span>
          <span className="rounded border border-white/10 bg-muted px-2 py-0.5 font-mono text-foreground">{codigo}</span>
        </div>

        <header className="animate-fade-up delay-100 flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-3 gap-2" variant="secondary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Dashboard activo
            </Badge>
            <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">Codigo {codigo}</h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Revisa visitas, picos y actividad reciente por rango de fechas.
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
            <StatsChart daily={chartDaily} />
            <RecentActivityTable daily={data.daily} />
          </>
        ) : data ? (
          <>
            <KpiCards daily={[]} totalClicks={data.total_clicks} />
            <EmptyState codigo={codigo ?? ""} />
          </>
        ) : (
          <EmptyState codigo={codigo ?? ""} />
        )}

        <footer className="mt-auto border-t pt-4">
          <Button asChild type="button" variant="ghost">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Consultar otro enlace
            </Link>
          </Button>
        </footer>
      </div>
    </main>
  );
}
