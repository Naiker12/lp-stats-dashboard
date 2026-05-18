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
      <section className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <nav className="animate-soft-in flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img alt="LinkPilot Analytics" className="brand-mark h-10 w-10 rounded-md" src="/logo.svg" />
            <div>
              <p className="text-sm font-semibold leading-none">LinkPilot Analytics</p>
              <p className="mt-1 text-xs text-muted-foreground">Estadisticas de enlaces</p>
            </div>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-8 py-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] lg:gap-12">
          <div className="animate-fade-up grid gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
              <TrendingUp className="h-4 w-4 text-accent" />
              Lectura diaria de visitas
            </div>
              <h1 className="max-w-3xl bg-gradient-to-br from-white to-white/55 bg-clip-text text-4xl font-semibold tracking-normal text-transparent sm:text-6xl">
                Consulta el rendimiento de tus enlaces cortos.
              </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Ingresa un codigo generado por el acortador para revisar clicks totales, pico diario y actividad por
              rango de fechas.
            </p>
          </div>

          <Card className="glass-card hover-lift animate-fade-up delay-200 border-primary/20">
            <CardHeader>
              <CardTitle>Buscar estadisticas</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <BarChart3 className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    aria-label="Codigo del enlace"
                    className="h-14 border-white/10 bg-white/[0.04] pl-12 text-base text-foreground placeholder:text-zinc-500 focus-visible:border-primary/40 focus-visible:ring-primary/25"
                    onChange={(event) => setCodigo(event.target.value)}
                    placeholder="Codigo del enlace"
                    value={codigo}
                  />
                </div>
                <Button className="h-12 w-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 sm:w-fit" disabled={!codigo.trim()} type="submit">
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
