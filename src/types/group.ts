export type GroupKey = "none" | "family" | "order" | "genus";

export type Group = {
  id: number;
  key: GroupKey;
  name: string;
};
