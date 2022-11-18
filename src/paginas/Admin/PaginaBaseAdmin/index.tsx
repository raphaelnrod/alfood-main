import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import SplitButton from "componentes/SplitButton/index";
import styles from './PaginaBaseAdmin.module.scss';

interface IOption {
  nome: string;
  id: string;
  path: string;
}

export default function PaginBaseAdmin() {
  const navigate = useNavigate();

  const restauranteOptions: IOption[] = [
    {
      nome: "Lista de Restaurantes",
      id: "listRestaurante",
      path: "/admin/restaurantes",
    },
    {
      nome: "Novo Restaurante",
      id: "newRestaurante",
      path: "/admin/restaurantes/novo",
    },
  ];

  const pratosOptions: IOption[] = [
    { nome: "Lista de Pratos", id: "listPratos", path: "/admin/pratos" },
    { nome: "Novo Prato", id: "newPrato", path: "/admin/pratos/novo" },
  ];

  function onClickOptionSplitButton(opt: IOption) {
    navigate(opt.path);
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              sx={{ display: "flex", flexGrow: 1, alignItems: "flex-start" }}
            >
              <div className={styles.container__btn}>
                <SplitButton
                  mainText="Restaurantes"
                  options={restauranteOptions}
                  onClick={(opt: IOption) => onClickOptionSplitButton(opt)}
                />
              </div>
              <div className={styles.container__btn}>
                <SplitButton
                  mainText="Pratos"
                  options={pratosOptions}
                  onClick={(opt: IOption) => onClickOptionSplitButton(opt)}
                />
              </div>
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
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
