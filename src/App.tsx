import { Routes, Route } from "react-router-dom";
import AdmRestaurantes from "./paginas/Admin/Restaurantes/AdmRestaurantes";
import FormRestaurante from "./paginas/Admin/Restaurantes/Form/FormRestaurante";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import { ToastContainer } from "react-toastify";
import PaginaBaseAdmin from './paginas/Admin/PaginaBaseAdmin/index';
import AdmPratos from "paginas/Admin/Pratos/AdmPratos";
import FormPratos from "paginas/Admin/Pratos/Form/FormPratos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<VitrineRestaurantes />} />
        <Route path="/admin/" element={<PaginaBaseAdmin/>}>
          <Route path="restaurantes" element={<AdmRestaurantes />} />
          <Route path="restaurantes/novo" element={<FormRestaurante />} />
          <Route path="restaurantes/:id" element={<FormRestaurante />} />
          <Route path="pratos" element={<AdmPratos />} />
          <Route path="pratos/novo" element={<FormPratos />} />
          <Route path="pratos/:id" element={<FormPratos />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
