import {
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import styles from "./FormRestaurante.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RestauranteService from "services/Restaurante.service";
import showToast from "componentes/Toast/toast";
import IRestaurante from "interfaces/IRestaurante";
import { AxiosError } from "axios";

export default function FormRestaurante() {
  const navigate = useNavigate();
  let service = new RestauranteService();
  const params = useParams();
  var nameTitle = params.id
    ? "Editar Restaurante"
    : "Adicionar novo Restaurante";

  useEffect(() => {
    if (params.id) {
      service
        .admin()
        .findById(Number(params.id))
        .then((data) => {
          setNomeRestaurante(data.data.nome);
        })
        .catch((err: AxiosError<IRestaurante>) => {
          showToast("Erro: " + err.response?.data.nome, "error");
        });
    }
  }, [params]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (params.id) {
      editarRestaurante();
      return;
    }
    service
      .admin()
      .saveNew(nomeRestaurante)
      .then((res) => {
        showToast("Salvo com sucesso!", "success");
        limparForm();
        navigate(-1);
      })
      .catch((err: AxiosError<{ nome: string }>) => {
        showToast("Erro: " + err.response?.data.nome, "error");
      });
  }

  function limparForm() {
    setNomeRestaurante("");
  }

  function editarRestaurante() {
    service
      .admin()
      .editName(Number(params.id), { nome: nomeRestaurante })
      .then((data) => {
        showToast(
          `Restaurante ${data.data.nome} alterado com sucesso!`,
          "success"
        );
        limparForm();
        navigate(-1);
      })
      .catch((err: AxiosError<IRestaurante>) => {
        showToast(`Erro: ${err.response?.data.nome}`, "error");
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px",
      }}
    >
      <Typography component="h1" variant="h6">
        {nameTitle}
      </Typography>
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          value={nomeRestaurante}
          onChange={(event) => setNomeRestaurante(event.target.value)}
          id="standard-basic"
          label="Nome Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <div className={styles.container__buttons}>
          <Button
            className={styles.container__buttons__btn}
            onClick={limparForm}
          >
            Limpar
          </Button>
          <Button
            className={styles.container__buttons__btn}
            variant="contained"
            type="submit"
          >
            {params.id ? "Editar" : "Adicionar"}
          </Button>
        </div>
      </Box>
    </Box>
  );
}
