import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import styles from "./FormPratos.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import showToast from "componentes/Toast/toast";
import IRestaurante from "interfaces/IRestaurante";
import { AxiosError } from "axios";
import PratoService from "services/Pratos.service";
import IPrato from "interfaces/IPrato";
import RestauranteService from "services/Restaurante.service";
import TagService from "services/Tag.service";
import { IGeneric } from "interfaces/IGeneric";
import SimpleBackdrop from "componentes/Backdrop/backdrop";

export default function FormPratos() {
  const navigate = useNavigate();
  let pratoService = new PratoService();
  let restauranteService = new RestauranteService();
  let tagService = new TagService();
  const params = useParams();
  var nameTitle = params.id ? "Editar Prato" : "Adicionar novo Prato";

  const [nomePrato, setNomePrato] = useState("");
  const [descricaoPrato, setDescricaoPrato] = useState("");
  const [tagPrato, setTagPrato] = useState("");
  const [restaurantePrato, setRestaurantePrato] = useState<number>(0);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [tags, setTags] = useState<IGeneric[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);

  const [active, setActive] = useState(false);

  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagem(event.target.files?.length ? event.target.files[0] : null);
  };

  useEffect(() => {
    if (params.id) getPratoById(Number(params.id));
    getLists();
  }, [params]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", nomePrato);
    formData.append("descricao", descricaoPrato);
    formData.append("tag", tagPrato);
    formData.append("restaurante", String(restaurantePrato));
    if(imagem) formData.append("imagem", imagem);  

    if (params.id) {
      editarPrato(formData, Number(params.id));
      return;
    }

    pratoService
      .customRequest({
        url: "/v2/pratos/",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
      .then((res) => {
        showToast("Salvo com sucesso!", "success");
        limparForm();
        navigate(-1);
      })
      .catch((err: AxiosError<{ nome: string }>) => {
        showToast("Erro: " + err.response?.data.nome, "error");
      });
  }

  function getPratoById(id: number) {
    setActive(true);
    pratoService
      .admin()
      .findById(id)
      .then((data) => {
        setPrato(data.data);
        setActive(false);
      })
      .catch((err: AxiosError<IPrato>) => {
        showToast("Erro: " + err.response?.data.nome, "error");
      });
  }

  function getLists() {
    restauranteService
      .admin()
      .getAll()
      .then((res) => {
        let listAfterSort = res.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setRestaurantes(listAfterSort);
      })
      .catch((err) => console.error(err));

    tagService
      .admin()
      .getAll()
      .then((res) => {
        let listAfterSort = res.data.tags.sort((a, b) =>
          a.value.localeCompare(b.value)
        );
        setTags(listAfterSort);
      })
      .catch((err) => console.error(err));
  }

  function setPrato(prato: IPrato) {
    setNomePrato(prato.nome);
    setDescricaoPrato(prato.descricao);
    setTagPrato(prato.tag);
    setRestaurantePrato(prato.restaurante);
  }

  function limparForm() {
    setNomePrato("");
    setDescricaoPrato("");
    setTagPrato("");
    setRestaurantePrato(0);
  }

  function editarPrato(formData: FormData, id: number) {
    pratoService
      .customRequest({
        url: "pratos/",
        method: "PUT",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
      .then((data) => {
        showToast(`Prato ${data.data.nome} alterado com sucesso!`, "success");
        limparForm();
        navigate(-1);
      })
      .catch((err: AxiosError<{ nome: string }>) => {
        showToast("Erro: " + err.response?.data.nome, "error");
      });
  }

  return (
    <>
      <SimpleBackdrop active={active} />
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
            value={nomePrato}
            onChange={(event) => setNomePrato(event.target.value)}
            id="standard-basic"
            label="Nome Prato"
            variant="standard"
            margin="dense"
            fullWidth
            required
          />
          <TextField
            value={descricaoPrato}
            onChange={(event) => setDescricaoPrato(event.target.value)}
            id="standard-basic"
            label="Descrição Prato"
            variant="standard"
            margin="dense"
            fullWidth
            required
          />
          <FormControl
            margin="dense"
            fullWidth
            sx={{ minWidth: 120 }}
            size="small"
          >
            <InputLabel id="select-tag">TAG</InputLabel>
            <Select
              labelId="select-tag"
              id="select-tag"
              value={tagPrato}
              required
              label="TAG"
              onChange={(event) => setTagPrato(event.target.value)}
            >
              {tags?.map((t) => (
                <MenuItem key={t.id} value={t.value}>
                  {t.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            margin="dense"
            fullWidth
            sx={{ minWidth: 120 }}
            size="small"
          >
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select
              labelId="select-restaurante"
              id="select-restaurante"
              value={restaurantePrato}
              label="Restaurante"
              required
              onChange={(event) =>
                setRestaurantePrato(Number(event.target.value))
              }
            >
              {restaurantes?.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <InputLabel
            size="small"
            margin="dense"
            className={styles.container__imagem}
          >
            Imagem do Prato
            <br />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(ev) => selecionarArquivo(ev)}
            />
          </InputLabel>
          <p className={styles.container__imagem__tip}>
            *Somente serão aceitos arquivos de imagem .jpg ou .png
          </p>

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
    </>
  );
}
