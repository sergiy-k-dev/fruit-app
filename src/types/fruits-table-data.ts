export type TableHeader = {
  align: "left" | "right";
  name: string;
};

export type TableRow = [string, string, string, string, number];

export type FruitTableData = {
  headerList: TableHeader[];
  rowList: TableRow[];
};
