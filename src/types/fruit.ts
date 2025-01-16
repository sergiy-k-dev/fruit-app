export type Nutritions = {
  carbohydrates: number;
  protein: number;
  fat: number;
  calories: number;
  sugar: number;
};

export type Fruit = {
  genus: string;
  name: string;
  id: number;
  family: string;
  order: string;
  nutritions: Nutritions;
  jarId?: string;
};
