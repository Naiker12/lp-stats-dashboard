import { BarChart3 } from "lucide-react";

import { Card, CardContent } from "./ui/card";

type EmptyStateProps = {
  codigo: string;
};

export function EmptyState({ codigo }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>
        <div className="max-w-md">
          <h2 className="text-base font-semibold">Sin visitas para este rango</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            El codigo <span className="font-medium text-foreground">{codigo}</span> no tiene datos diarios en las
            fechas seleccionadas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
