import { Chart } from "@/components";
import type { ChartConfig } from "@/components/ui/Chart";
import type { DailyStats } from "@/shared/types/interfaces";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis
} from "recharts";
const chartConfig = {
  completed_count: {
    label: "Выполнено",
    color: "var(--colot-completed-count)"
  },
  remaining_booked: {
    label: "Записи",
    color: "var(--color-total_booked)"
  }
} satisfies ChartConfig;
export const ChartPerDate = ({
  daily_stat
}: {
  daily_stat: DailyStats[];
}) => {
  const transformedData = daily_stat.map((item) => ({
    ...item,
    remaining_booked: Math.max(
      0,
      item.total_booked - item.completed_count
    )
  }));
  return (
    <Chart.ChartContainer config={chartConfig}>
      <BarChart data={transformedData}>
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          className="stroke-muted"
        />
        <Bar
          stackId={"a"}
          dataKey={"completed_count"}
          fill="var(--colot-completed-count)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey={"remaining_booked"}
          stackId={"a"}
          fill="var(--color-total_booked)"
          radius={[4, 4, 0, 0]}
        />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const date = new Date(value);
            return isNaN(date.getTime())
              ? value
              : date.getDate().toString();
          }}
        />
        <Chart.ChartTooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          content={
            <Chart.ChartTooltipContent
              formatter={(value, name, item) => {
                if (name === "remaining_booked") {
                  const total = item.payload.total_booked;
                  return (
                    <span>{total} (Всего записано)</span>
                  );
                }
                return <span>{value} (Выполнено)</span>;
              }}
            />
          }
        />
        <Chart.ChartLegend
          content={<Chart.ChartLegendContent />}
        />
      </BarChart>
    </Chart.ChartContainer>
  );
};
