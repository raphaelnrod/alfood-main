import { AppBar, Container, Toolbar, Box, Button, Typography, Paper, Link } from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

export default function PaginBaseAdmin() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ mx: 2, my: 2, color: "white" }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ mx: 2, my: 2, color: "white" }}>
                  Novo Restaurante
                </Button>
              </Link>
            </Box>
            <Typography variant="h6" sx={{ textAlign: "end" }}>
              Administração
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet/>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
