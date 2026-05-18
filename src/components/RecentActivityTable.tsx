import type { DailyEntry } from "../services/api";
import { Card } from "./ui/card";

type RecentActivityTableProps = {
  daily: DailyEntry[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function RecentActivityTable({ daily }: RecentActivityTableProps) {
  const rows = daily.filter((entry) => entry.clicks > 0).slice(-8).reverse();

  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="border-b border-white/10 p-5">
        <h2 className="text-sm font-semibold">Actividad reciente</h2>
        <p className="mt-1 text-xs text-muted-foreground">Ultimos registros con al menos 1 click</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Fecha</th>
              <th className="px-5 py-3 font-medium">Clicks</th>
              <th className="px-5 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((entry) => (
                <tr className="border-b border-white/5 last:border-0 hover:bg-muted/50" key={entry.fecha}>
                  <td className="px-5 py-3 font-mono text-xs text-foreground">{formatDate(entry.fecha)}</td>
                  <td className="px-5 py-3 font-semibold text-foreground">{entry.clicks.toLocaleString("es-CO")}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Activo
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-5 py-8 text-center text-muted-foreground" colSpan={3}>
                  Sin actividad en el periodo seleccionado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
