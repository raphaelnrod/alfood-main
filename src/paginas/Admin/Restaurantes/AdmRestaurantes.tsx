import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Icon,
} from "@mui/material";
import RestauranteService from "../../../services/Restaurante.service";
import styles from "./AdmRestaurante.module.scss";
import { Link, useNavigate } from "react-router-dom";
import showToast from "componentes/Toast/toast";
import { AxiosError } from "axios";
import SimpleBackdrop from "componentes/Backdrop/backdrop";

export default function AdmRestaurantes() {
  let service = new RestauranteService();
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //obter restaurantes
    getRestaurantes();
  }, []);

  function getRestaurantes() {
    setActive(true);
    service
      .admin()
      .getAll()
      .then((data) => {
        setRestaurantes(data.data);
        setActive(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function excluirRestaurante(id: number) {
    service
      .admin()
      .deleteRestaurante(id)
      .then((data) => {
        showToast("Restaurante removido com sucesso", "success");
        getRestaurantes();
      })
      .catch((err: AxiosError) => {
        showToast("Erro: " + err.response, "error");
      });
  }

  return (
    <>
      <SimpleBackdrop active={active} />
      <TableContainer className={styles.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>
                  <Link to={`/admin/restaurantes/${item.id}`}>
                    <Icon className={styles.table_icon}>edit</Icon>
                  </Link>
                  <Button onClick={() => excluirRestaurante(item.id)}>
                    <Icon className={styles.table_icon}>delete</Icon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.button}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Voltar HOME
        </Button>
        <Button variant="outlined" onClick={() => navigate("novo")}>
          Novo
        </Button>
      </div>
    </>
  );
}
