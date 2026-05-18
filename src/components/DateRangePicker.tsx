import { CalendarDays, RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

type DateRangePickerProps = {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
};

export function DateRangePicker({ from, to, onChange }: DateRangePickerProps) {
  const [draftFrom, setDraftFrom] = useState(from);
  const [draftTo, setDraftTo] = useState(to);

  return (
    <form
      className="flex flex-col gap-3 md:flex-row md:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        onChange(draftFrom, draftTo);
      }}
    >
      <div className="grid gap-1.5">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="from">
          Desde
        </label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full border-white/10 bg-white/[0.04] pl-9 text-foreground md:w-40"
            id="from"
            max={draftTo}
            onChange={(event) => setDraftFrom(event.target.value)}
            type="date"
            value={draftFrom}
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
            min={draftFrom}
            onChange={(event) => setDraftTo(event.target.value)}
            type="date"
            value={draftTo}
          />
        </div>
      </div>

      <Button className="w-full md:mb-0 md:w-auto" type="submit">
        <RefreshCw className="h-4 w-4" />
        Actualizar
      </Button>
    </form>
  );
}
