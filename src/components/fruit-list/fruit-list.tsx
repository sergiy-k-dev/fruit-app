import { FC, ReactNode } from "react";

import { List } from "@mui/material";
import FruitListItem from "../fruit-list-item";

import type { Fruit } from "../../types";

type Props = {
  handleFruitSelect: (id: number, jarId: string) => void;
  fruitList: Fruit[];
  variantButton?: "add" | "remove";
};

const FruitList: FC<Props> = ({
  handleFruitSelect,
  fruitList,
  variantButton = "add",
}): ReactNode => {
  return (
    <List>
      {fruitList.map(({ id, name, nutritions: { calories }, jarId }) => (
        <FruitListItem
          key={jarId || id}
          handleFruitSelect={handleFruitSelect}
          id={id}
          jarId={jarId || ""}
          name={name}
          calories={calories}
          variantButton={variantButton}
        />
      ))}
    </List>
  );
};

export default FruitList;
