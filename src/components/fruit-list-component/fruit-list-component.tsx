import { FC, ReactNode, MouseEvent } from "react";

import FruitList from "../fruit-list";
import FruitTable from "../fruit-table";
import GroupedFruitList from "../grouped-fruit-list";
import { Section, Bar } from "../styled-components";
import {
  Grid2 as Grid,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import type { Fruit, GroupedItem, GroupKey, ViewType, FruitTableData } from "../../types";

type Props = {
  handleToggleView: (event: MouseEvent<HTMLElement>) => void;
  handleFruitAdd: (id: number, jarId: string) => void;
  viewType: ViewType;
  fruitList: Fruit[];
  fruitTableData: FruitTableData | null;
  groupKey: GroupKey;
  groupedList: GroupedItem[] | null;
};

const FruitListComponent: FC<Props> = ({
  handleToggleView,
  handleFruitAdd,
  viewType,
  fruitList,
  fruitTableData,
  groupKey,
  groupedList,
}): ReactNode => {
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      size={{ xs: 12, md: 9 }}
      offset={{ xs: 0, md: 0 }}
      style={{ height: "100%" }}
    >
      <Section elevation={3}>
        <Typography variant="h4">List of Fruits</Typography>

        <Section elevation={3}>
          <Bar elevation={3}>
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={viewType}
              exclusive
              onChange={handleToggleView}
              aria-label="toggle-view"
            >
              <ToggleButton value="list">{"List"}</ToggleButton>
              <ToggleButton value="table">{"Table"}</ToggleButton>
            </ToggleButtonGroup>
          </Bar>
        </Section>

        <Section elevation={3} style={{ height: "60vh", overflow: "auto" }}>
          {viewType === "table" && fruitTableData &&(
            <FruitTable fruitTableData={fruitTableData} />
          )}

          {!groupedList?.length && viewType !== "table" && (
            <FruitList
              handleFruitSelect={handleFruitAdd}
              fruitList={fruitList}
            />
          )}

          {groupedList?.length && viewType !== "table" && (
            <GroupedFruitList
              handleFruitAdd={handleFruitAdd}
              groupKey={groupKey}
              groupedList={groupedList}
            />
          )}
        </Section>
      </Section>
    </Grid>
  );
};

export default FruitListComponent;
