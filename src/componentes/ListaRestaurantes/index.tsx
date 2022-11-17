import IRestaurante from "../../interfaces/IRestaurante";
import RestauranteService from "../../services/Restaurante.service";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import { useEffect, useState } from "react";

const ListaRestaurantes = () => {
  let service = new RestauranteService();
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proxPagina, setProxPagina] = useState<string>("");

  useEffect(() => {
    //obter restaurantes
    getRestaurantes();
  }, []);

  const verMais = () => {
    let nextPage = proxPagina && proxPagina.slice(-1);
    if(!Number(nextPage)) throw new Error('PROXIMA PAGINA INVALIDA');
    getRestaurantes(`?page=${nextPage}`);
  };

  function getRestaurantes(nextPage?: string) {
    service
      .getRestaurantes(nextPage)
      .then((data) => {
        setRestaurantes([...restaurantes, ...data.data.results]);
        setProxPagina(data.data.next);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proxPagina && <button onClick={verMais}>Ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
