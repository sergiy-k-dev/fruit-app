import { FC, ReactNode } from "react";

import { Typography } from "@mui/material";
import { Section } from "../styled-components";

type Props = {
  errorMessage: string;
};

const FruitJar: FC<Props> = ({ errorMessage }): ReactNode => {
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
      <Typography variant="h6" gutterBottom>
        Something went wrong. Try again and refresh the page.
      </Typography>

      <Typography
        variant="h4"
        style={{
          marginTop: "16px",
        }}
      >
        {errorMessage}
      </Typography>
    </Section>
  );
};

export default FruitJar;
