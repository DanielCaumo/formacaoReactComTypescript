import styles from './Item.module.scss';
import DetalhesDoPrato from 'components/DetalhesDoPrato';
import { Prato } from 'types/Prato';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

function Item(props: Prato) {
  const { id, title, photo, description } = props;
  const navigate = useNavigate();
  return (
    <div className={styles.item} onClick={() => navigate(`/cardapio/${id}`)}>
      <div className={styles.item__imagem}>
        <img src={photo} alt={title} />
      </div>
      <div className={styles.item__descricao}>
        <div className={styles.item__titulo}>
          <h2> {title} </h2>
          <p> {description} </p>
        </div>
        <DetalhesDoPrato {...props} />
      </div>
    </div>
  );
}

export default memo(Item);