import { FC, ReactNode } from "react";

import { CircularProgress, Typography } from "@mui/material";
import { Section } from "../styled-components";

const FruitJar: FC = (): ReactNode => {
  return (
    <Section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
      elevation={5}
    >
      <CircularProgress size="80px" />

      <Typography
        variant="h4"
        style={{
          marginTop: "16px",
        }}
      >
        Data loading...
      </Typography>
    </Section>
  );
};

export default FruitJar;
