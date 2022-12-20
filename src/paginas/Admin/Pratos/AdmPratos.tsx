import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Icon,
  Button,
} from "@mui/material";
import styles from "./AdmPratos.module.scss";
import { Link, useNavigate } from "react-router-dom";
import showToast from "componentes/Toast/toast";
import { AxiosError } from "axios";
import SimpleBackdrop from "componentes/Backdrop/backdrop";
import PratoService from "services/Pratos.service";
import React from "react";
import IPrato from "interfaces/IPrato";

export default function AdmPratos() {
  let service = new PratoService();
  const [pratos, setPratos] = React.useState<IPrato[]>([]);
  const [active, setActive] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    //obter restaurantes
    getPratos();
  }, []);

  function getPratos() {
    setActive(true);
    service
      .admin()
      .getAll()
      .then((data) => {
        setPratos(data.data);
        setActive(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function excluirPrato(id: number = 0) {
    service
      .admin()
      .deletePrato(id)
      .then((data) => {
        showToast("Prato removido com sucesso", "success");
        getPratos();
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
              <TableCell>Nome</TableCell>
              <TableCell>TAG</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.tag}</TableCell>
                <TableCell>
                  [
                  <a href={item.imagem} target="_blank">
                    Ver Imagem
                  </a>
                  ]
                </TableCell>
                <TableCell>
                  <Link to={`/admin/pratos/${item.id}`}>
                    <Icon className={styles.table_icon}>edit</Icon>
                  </Link>
                  <Button onClick={() => excluirPrato(item.id)}>
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
