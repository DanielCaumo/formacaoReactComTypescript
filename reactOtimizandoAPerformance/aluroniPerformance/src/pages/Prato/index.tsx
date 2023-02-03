import styles from './Prato.module.scss';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import cardapio from 'data/cardapio.json';
import { lazy } from 'react';


const PaginaPadrao = lazy(() => import('components/PaginaPadrao'));
const DetalhesDoPrato = lazy(() => import('components/DetalhesDoPrato'));
const NotFound= lazy(() => import('pages/NotFound'));

export default function Prato() {
  const { id } = useParams();
  const navigate = useNavigate();
  const prato = cardapio.find(prato => prato.id === Number(id));
  if(!prato) {
    return <NotFound />;
  }
  return (
    <Routes>
      <Route element={<PaginaPadrao />}>
        <Route
          path="*"
          element={
            <>
              <button className={styles.voltar} onClick={() => navigate(-1)}> {'< Voltar'} </button>
              <section className={styles.container}>
                <h1 className={styles.titulo}>{prato.title}</h1>
                <div className={styles.imagem}>
                  <img src={prato.photo} alt={prato.title} />
                </div>
                <div className={styles.conteudo}>
                  <p className={styles.conteudo__descricao}>
                    {prato.description}
                  </p>
                  <DetalhesDoPrato {...prato} />
                </div>
              </section>
            </>
          }
        />
      </Route>
    </Routes>
  );
}