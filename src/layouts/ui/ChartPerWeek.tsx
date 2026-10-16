import { Chart } from "@/components";
import type { ChartConfig } from "@/components/ui/Chart";
import { Bar, BarChart } from "recharts";
const chartConfig = {
  desktop: {
    label: "done",
    color: "#2563eb"
  },
  mobile: {
    label: "soon",
    color: "#60a5fa"
  }
} satisfies ChartConfig;
export const ChartPerWeek = () => {
  return (
    <Chart.ChartContainer config={chartConfig}>
      <BarChart data={[{ day: "Пн", done: 13, soon: 15 }]}>
        <Bar dataKey={"day"} />
        <Chart.ChartLegend>
          <span>записи</span>
          <span>Выполнено</span>
        </Chart.ChartLegend>
      </BarChart>
    </Chart.ChartContainer>
  );
};
