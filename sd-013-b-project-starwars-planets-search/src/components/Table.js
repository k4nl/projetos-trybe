import React, { useContext } from 'react';
import { Context } from '../context/Provider';
import Filters from './Filters';
import TableBody from './TableBody';

const Table = () => {
  const { planets } = useContext(Context);
  if (planets.length === 0) {
    return <div>Carregando...</div>;
  }
  return (
    <div>
      <Filters />
      <TableBody />
    </div>
  );
};

export default Table;
