import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

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
    <Card>
      <CardHeader>
        <CardTitle>Clicks diarios</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-80 w-full" config={chartConfig}>
          <LineChart data={data} margin={{ top: 8, right: 18, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis axisLine={false} dataKey="label" minTickGap={24} tickLine={false} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={36} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.fecha ?? ""}
            />
            <Line
              activeDot={{ r: 5 }}
              dataKey="clicks"
              dot={{ r: 3 }}
              stroke="var(--color-clicks, #147a75)"
              strokeWidth={3}
              type="monotone"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
