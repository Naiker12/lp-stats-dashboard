import { BarChart3, CalendarRange } from "lucide-react";

import { Card, CardContent } from "./ui/card";

type EmptyStateProps = {
  codigo: string;
};

export function EmptyState({ codigo }: EmptyStateProps) {
  return (
    <Card className="border-dashed bg-card/80">
      <CardContent className="flex min-h-80 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-secondary">
          <BarChart3 className="h-7 w-7 text-primary" />
        </div>
        <div className="max-w-md">
          <h2 className="text-lg font-semibold">Aun no hay visitas en este rango</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            El codigo <span className="font-medium text-foreground">{codigo}</span> esta conectado, pero no registra
            actividad para las fechas seleccionadas.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground">
          <CalendarRange className="h-4 w-4 text-primary" />
          Cambia el rango o visita el enlace corto para generar datos.
        </div>
      </CardContent>
    </Card>
  );
}
