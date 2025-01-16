import { FC, ReactNode } from "react";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import type { JarChartItem } from "../../types";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#581845",
  "#3498DB",
  "#2ECC71",
  "#F39C12",
  "#8E44AD",
  "#1ABC9C",
  "#34495E",
];

type Props = {
  jarChartList: JarChartItem[];
};

const FruitJar: FC<Props> = ({ jarChartList }): ReactNode => {
  return (
    <PieChart width={204} height={320}>
      <Pie
        data={jarChartList}
        cx={110}
        cy={90}
        innerRadius={20}
        outerRadius={40}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {jarChartList.map((entry, index) => (
          <Cell
            key={`cell-${entry}-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />

      <Legend />
    </PieChart>
  );
};

export default FruitJar;
