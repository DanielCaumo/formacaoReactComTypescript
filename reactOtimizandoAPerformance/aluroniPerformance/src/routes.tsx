import Footer from 'components/Footer';
import Menu from 'components/Menu';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const PaginaPadrao = lazy(() => import('components/PaginaPadrao'));
const Inicio = lazy(() => import('pages/Inicio'));
const Cardapio = lazy(() => import('pages/Cardapio'));
const Sobre = lazy(() => import('pages/Sobre'));
const Prato = lazy(() => import('pages/Prato'));
const NotFound = lazy(() => import('pages/NotFound'));

export default function Router() {
  return (
    <main className="container">
      <BrowserRouter>
        <Menu />
        <Suspense fallback={<p>Carregando...</p>}>
          <Routes>
            <Route path="/" element={<PaginaPadrao />}>
              <Route index element={<Inicio />} />
              <Route path="sobre" element={<Sobre />} />
              <Route path="cardapio" element={<Cardapio />} />
            </Route>
            <Route path="cardapio/:id/*" element={<Prato />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </main>
  );
}