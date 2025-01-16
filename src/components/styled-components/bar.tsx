import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const Bar = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 8px 0 8px",
  height: '48px',
  lineHeight: "60px",
}));

export default Bar;
