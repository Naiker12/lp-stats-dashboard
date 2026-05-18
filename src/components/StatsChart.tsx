import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import type { DailyEntry } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./ui/chart";

type StatsChartProps = {
  daily: DailyEntry[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${value}T00:00:00`));
}

export function StatsChart({ daily }: StatsChartProps) {
  const data = daily.map((entry) => ({
    ...entry,
    label: formatDate(entry.fecha),
  }));
  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "#147a75",
    },
  } satisfies ChartConfig;

  return (
    <Card className="animate-fade-up delay-300 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle>Actividad diaria</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">Clicks por dia en el rango seleccionado</p>
        </div>
        <div className="flex rounded-md border border-white/10 bg-muted p-1">
          {["7d", "30d", "Todo"].map((tab) => (
            <button
              className={`h-7 rounded px-3 text-xs font-medium transition-colors ${
                tab === "30d" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              key={tab}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-80 w-full" config={chartConfig}>
          <AreaChart data={data} margin={{ top: 8, right: 18, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="clicksGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.34} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis axisLine={false} dataKey="label" minTickGap={24} tickLine={false} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={36} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.fecha ?? ""}
            />
            <Area
              activeDot={{ r: 5 }}
              dataKey="clicks"
              dot={{ r: 3 }}
              fill="url(#clicksGradient)"
              stroke="var(--color-clicks, #147a75)"
              strokeWidth={3}
              type="monotone"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
