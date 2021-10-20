import React, { useContext, useState } from 'react';
import { Context } from '../context/Provider';

const SelectFilters = () => {
  const INITIAL_FILTERS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [inicialFilters, setInicialFilters] = useState(INITIAL_FILTERS);
  const {
    filters: { filterByNumericValues },
    handleSubmit,
  } = useContext(Context);
  const [selectFilters, setSelectFilters] = useState([]);

  const handleSelectChanges = ({ target }) => {
    const { id, value } = target;
    setSelectFilters({
      ...selectFilters,
      [id]: value,
    });
  };
  // codigo feito com a ajuda da Milena e Jeferson
  const removeUsedFilter = () => {
    const { column } = selectFilters;
    const newFilter = [...inicialFilters];
    newFilter.splice(newFilter.indexOf(column), 1);
    setInicialFilters(newFilter);
  };

  const { column, comparison, value } = filterByNumericValues;
  return (
    <div>
      <select
        data-testid="column-filter"
        id="column"
        value={ column }
        onChange={ handleSelectChanges }
      >
        {' '}
        {
          inicialFilters.map((item) => (
            <option key={ item } value={ item }>
              {item}
            </option>))
        }
      </select>
      <select
        data-testid="comparison-filter"
        id="comparison"
        value={ comparison }
        onChange={ handleSelectChanges }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        id="value"
        value={ value }
        onChange={ handleSelectChanges }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          handleSubmit(selectFilters);
          removeUsedFilter();
        } }
      >
        Filtrar
      </button>
    </div>
  );
};

export default SelectFilters;
