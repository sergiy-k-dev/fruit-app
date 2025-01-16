import { AppBar, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <AppBar
      position="static"
      component="footer"
      color="primary"
      sx={{ mt: "auto", py: 2 }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="inherit" align="center">
          &copy; {new Date().getFullYear()} Fruit Application. All rights
          reserved.
        </Typography>
      </Container>
    </AppBar>
  );
}

export default Footer;
