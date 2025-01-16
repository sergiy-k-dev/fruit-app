import { FC, ReactNode } from "react";

import { Grid2 as Grid, Typography, Button } from "@mui/material";
import { Section, Bar } from "../styled-components";
import FruitList from "../fruit-list";
import JarChart from "../jar-chart";

import type { Fruit, JarChartItem } from "../../types";

type Props = {
  handleClearJar: () => void;
  handleFruitRemove: (id: number, jarId: string) => void;
  totalCalories: number;
  fruitList: Fruit[];
  jarChartList: JarChartItem[];
};

const FruitJar: FC<Props> = ({
  handleClearJar,
  handleFruitRemove,
  totalCalories,
  fruitList,
  jarChartList,
}): ReactNode => {
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      size={{ xs: 12, md: 3 }}
      offset={{ xs: 0, md: 0 }}
      style={{ height: "100%" }}
    >
      <Section elevation={3}>
        <Typography variant="h4">Jar</Typography>

        <Bar elevation={3}>
          <Button onClick={handleClearJar} variant="outlined" size="small">
            {"Clear"}
          </Button>

          <Typography variant="body1">
            {`Total calories: ${totalCalories}`}
          </Typography>
        </Bar>

        <Section
          style={{
            height: "35vh",
            overflow: "auto",
            padding: "0",
            margin: "8px 0 0 0",
          }}
          elevation={3}
        >
          <FruitList
            handleFruitSelect={handleFruitRemove}
            fruitList={fruitList}
            variantButton="remove"
          />
        </Section>

        <Section
          style={{
            height: "26vh",
            overflow: "auto",
            padding: "0",
            margin: "8px 0 0 0",
          }}
          elevation={3}
        >
          <JarChart jarChartList={jarChartList} />
        </Section>
      </Section>
    </Grid>
  );
};

export default FruitJar;
