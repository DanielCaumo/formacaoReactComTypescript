import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/Admin/Restaurantes';
import FormRestaurante from './paginas/Admin/FormRestaurante';
import AdminManager from './paginas/Admin/AdminManager';
import AdminPratos from './paginas/Admin/Pratos';
import FormPrato from './paginas/Admin/FormPratos';

function App() {

  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<VitrineRestaurantes />} />
        <Route path="/admin" element={<AdminManager />}>
          <Route path="restaurantes" element={<AdminRestaurantes />} />
          <Route path="restaurantes/novo" element={<FormRestaurante />} />
          <Route path="restaurantes/:id" element={<FormRestaurante />} />
          <Route path="pratos" element={<AdminPratos />} />
          <Route path="pratos/novo" element={<FormPrato />} />
          <Route path="pratos/:id" element={<FormPrato />} />
        </Route>
      </Routes>
    
  )
}

export default App;
