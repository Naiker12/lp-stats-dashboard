import { Activity, CalendarClock, MousePointerClick } from "lucide-react";

import type { DailyEntry } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type KpiCardsProps = {
  totalClicks: number;
  daily: DailyEntry[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function KpiCards({ totalClicks, daily }: KpiCardsProps) {
  const peak = daily.reduce<DailyEntry | null>((current, entry) => {
    if (!current || entry.clicks > current.clicks) {
      return entry;
    }

    return current;
  }, null);

  const daysWithClicks = daily.filter((entry) => entry.clicks > 0);
  const average = daysWithClicks.length > 0 ? Math.round(totalClicks / daysWithClicks.length) : 0;

  const cards = [
    {
      title: "Clicks totales",
      value: totalClicks.toLocaleString("es-CO"),
      helper: `${daily.length} dias consultados`,
      icon: MousePointerClick,
    },
    {
      title: "Mejor dia",
      value: (peak?.clicks ?? 0).toLocaleString("es-CO"),
      helper: peak ? formatDate(peak.fecha) : "Sin actividad",
      icon: Activity,
    },
    {
      title: "Promedio",
      value: average.toLocaleString("es-CO"),
      helper: `${daysWithClicks.length} dias con datos`,
      icon: CalendarClock,
    },
  ];

  return (
    <section className="animate-fade-up delay-200 grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card className="hover-lift bg-card/90 shadow-sm" key={card.title}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground">{card.title}</CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold tracking-normal">{card.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{card.helper}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
