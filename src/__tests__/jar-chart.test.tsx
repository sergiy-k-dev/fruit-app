import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import JarChart from "../components/jar-chart";

import type { JarChartItem } from "../../src/types";

describe("FruitJar Component", () => {
  const mockJarChartList: JarChartItem[] = [
    { name: "Apple", value: 10 },
    { name: "Banana", value: 15 },
  ];

  test("renders a Chart Component", () => {
    const { container } = render(<JarChart jarChartList={mockJarChartList} />);

    const pieChartComponent = container.querySelector(".recharts-wrapper");

    expect(pieChartComponent).toBeInTheDocument();
  });

  test("renders a Pie Chart", () => {
    const { container } = render(<JarChart jarChartList={mockJarChartList} />);

    const pieChart = container.querySelector(".recharts-surface");

    expect(pieChart).toBeInTheDocument();
  });

  test("renders a Legend", () => {
    const { container } = render(<JarChart jarChartList={mockJarChartList} />);

    const pieChartLegend = container.querySelectorAll(".recharts-legend-item");

    expect(pieChartLegend).toHaveLength(mockJarChartList.length);
  });
});
