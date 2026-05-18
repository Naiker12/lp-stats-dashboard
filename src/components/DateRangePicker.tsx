import { CalendarDays, RefreshCw } from "lucide-react";

import { Input } from "./ui/input";

type DateRangePickerProps = {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
  loading?: boolean;
};

export function DateRangePicker({ from, to, onChange, loading = false }: DateRangePickerProps) {
  function updateFrom(nextFrom: string) {
    onChange(nextFrom, nextFrom > to ? nextFrom : to);
  }

  function updateTo(nextTo: string) {
    onChange(nextTo < from ? nextTo : from, nextTo);
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <div className="grid gap-1.5">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="from">
          Desde
        </label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full border-white/10 bg-white/[0.04] pl-9 text-foreground md:w-40"
            id="from"
            max={to}
            onChange={(event) => updateFrom(event.target.value)}
            type="date"
            value={from}
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="to">
          Hasta
        </label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full border-white/10 bg-white/[0.04] pl-9 text-foreground md:w-40"
            id="to"
            min={from}
            onChange={(event) => updateTo(event.target.value)}
            type="date"
            value={to}
          />
        </div>
      </div>

      <div className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 text-sm font-medium text-primary md:mb-0">
        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        En vivo
      </div>
    </div>
  );
}
