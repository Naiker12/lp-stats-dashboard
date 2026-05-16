import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    color?: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
  const colorVars = Object.entries(config).reduce<React.CSSProperties>((vars, [key, value]) => {
    if (value.color) {
      return {
        ...vars,
        [`--color-${key}`]: value.color,
      } as React.CSSProperties;
    }

    return vars;
  }, {});

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border [&_.recharts-tooltip-cursor]:stroke-border",
          className,
        )}
        data-chart={chartId}
        ref={ref}
        style={colorVars}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "ChartContainer";

export const ChartTooltip = RechartsPrimitive.Tooltip;

export function ChartTooltipContent({
  active,
  className,
  payload,
  label,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & React.ComponentProps<"div">) {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className={cn("grid min-w-36 gap-2 rounded-lg border bg-card p-3 text-sm shadow-md", className)}>
      {label ? <div className="font-medium">{label}</div> : null}
      <div className="grid gap-1.5">
        {payload.map((item) => {
          const key = String(item.dataKey ?? item.name ?? "");
          const itemConfig = config[key];

          return (
            <div className="flex items-center justify-between gap-6" key={key}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: item.color ?? itemConfig?.color }}
                />
                {itemConfig?.label ?? item.name}
              </div>
              <span className="font-mono font-medium text-foreground">{item.value?.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
