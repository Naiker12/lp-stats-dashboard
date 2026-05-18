import { BarChart3, Search, TrendingUp } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

export function StatsLookupPage() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = codigo.trim();

    if (value) {
      navigate(`/stats/${encodeURIComponent(value)}`);
    }
  }

  return (
    <main className="dashboard-shell">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img alt="LinkPilot Analytics" className="brand-mark h-10 w-10 rounded-md" src="/logo.svg" />
            <div>
              <p className="text-sm font-semibold leading-none">LinkPilot Analytics</p>
              <p className="mt-1 text-xs text-muted-foreground">Estadisticas de enlaces</p>
            </div>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
              <TrendingUp className="h-4 w-4 text-accent" />
              Lectura diaria de visitas
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Consulta el rendimiento de tus enlaces cortos.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Ingresa un codigo generado por el acortador para revisar clicks totales, pico diario y actividad por
              rango de fechas.
            </p>
          </div>

          <Card className="border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle>Buscar estadisticas</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <BarChart3 className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    aria-label="Codigo del enlace"
                    className="h-14 pl-12 text-base"
                    onChange={(event) => setCodigo(event.target.value)}
                    placeholder="Codigo del enlace"
                    value={codigo}
                  />
                </div>
                <Button className="h-12 w-full sm:w-fit" disabled={!codigo.trim()} type="submit">
                  <Search className="h-4 w-4" />
                  Consultar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
