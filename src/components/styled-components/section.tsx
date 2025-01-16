import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  height: "100%",
  width: "100%",
}));

export default Section;
