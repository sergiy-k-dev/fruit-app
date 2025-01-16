import type { Fruit } from "./fruit";

export type GroupedItem = {
  id: number;
  groupKeyValue: string;
  values: Fruit[];
};
