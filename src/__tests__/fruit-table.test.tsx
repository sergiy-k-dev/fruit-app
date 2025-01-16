import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FruitTable from "../components/fruit-table";

import type { FruitTableData, TableHeader} from "../types"; 

const headerList: TableHeader[] =  [
  {
    align: "left",
    name: "Fruit name",
  },
  {
    align: "right",
    name: "Family",
  },
  {
    align: "right",
    name: "Order",
  },
  {
    align: "right",
    name: "Genus",
  },
  {
    align: "right",
    name: "Calories",
  },
]

const mockTableData: FruitTableData =  {
  headerList,
  rowList: [['name1', 'family1', 'order1', 'genus1', 0]],
};

const mockNoTableData: FruitTableData =  {
  headerList,
  rowList: [],
};

describe("Table with Fuit List", () => {
  test("renders the Table", () => {
    render(<FruitTable fruitTableData={mockNoTableData}/>);

    const fruitTableElement = screen.queryByRole('td');

    expect(fruitTableElement).not.toBeInTheDocument();
  });

  test("renders the Table", () => {
    render(<FruitTable fruitTableData={mockTableData}/>);

    const fruitTableElement = screen.getByRole('table');

    expect(fruitTableElement).toBeInTheDocument();
  });
});