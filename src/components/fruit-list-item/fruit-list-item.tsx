import { FC, ReactNode } from "react";

import { ListItem, ListItemText, Button, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  handleFruitSelect: (id: number, jarId: string) => void;
  id: number;
  name: string;
  jarId: string;
  calories: number;
  variantButton: "add" | "remove";
};

const FruitListItem: FC<Props> = ({
  handleFruitSelect,
  id,
  jarId,
  name,
  calories,
  variantButton,
}): ReactNode => {
  const variant = variantButton === "add" ? "contained" : "outlined";

  return (
    <ListItem divider>
      <ListItemText primary={`${name} (${calories})`} />

      {variantButton === "remove" && (
        <IconButton
          onClick={() => handleFruitSelect(id, jarId)}
          size="small"
          style={{ textTransform: "capitalize" }}
          aria-label="delete fruit"
          color="primary"
        >
          <DeleteIcon />
        </IconButton>
      )}

      {variantButton === "add" && (
        <Button
          onClick={() => handleFruitSelect(id, jarId)}
          variant={variant}
          size="small"
          style={{ textTransform: "capitalize" }}
        >
          {variantButton}
        </Button>
      )}
    </ListItem>
  );
};

export default FruitListItem;
