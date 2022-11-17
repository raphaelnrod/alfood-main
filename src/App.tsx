import { Routes, Route } from 'react-router-dom';
import AdmRestaurantes from './paginas/Admin/Restaurantes/AdmRestaurantes';
import FormRestaurante from './paginas/Admin/Restaurantes/Form/FormRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdmRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormRestaurante />} />
    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
