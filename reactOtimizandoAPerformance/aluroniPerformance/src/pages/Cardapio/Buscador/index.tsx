import React, { useMemo } from 'react';
import styles from './Buscador.module.scss';
import { CgSearch } from 'react-icons/cg';

interface Props {
  busca: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
}

export default function Buscador({ busca, setBusca }: Props) {
  const iconeBusca = useMemo(() => <CgSearch size={20} color="#4C4D5E" />, []);
  return (
    <div className={styles.buscador}>
      <input
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
        placeholder="Buscar"
      />
      {iconeBusca}
    </div>
  );
}