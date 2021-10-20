import React, { useContext } from 'react';
import { Context } from '../context/Provider';

const TableBody = () => {
  const { planetsCopy, planets } = useContext(Context);
  return (
    // esse trecho de codigo foi feito baseado no codigo do Felipe Ventorantim. Inicialmente
    // tinha pensado em fazer manualmente, mas achei interessante essa forma dinamica de
    // se fazer o cabecalho da tabela dinamicamente.
    <table>
      <thead>
        <tr>
          { Object.keys(planets[0]).map((item, index) => (
            <th key={ index }>{ item }</th>))}
        </tr>
      </thead>
      <tbody>
        {planetsCopy && planetsCopy.map((planet, index) => (
          <tr key={ index }>
            { Object.values(planet).map((item) => (
              <td key={ item }>
                { item }
              </td>
            ))}
          </tr>))}
      </tbody>
    </table>
  );
};

export default TableBody;
