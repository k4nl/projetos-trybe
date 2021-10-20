import React, { useContext } from 'react';
import { Context } from '../context/Provider';

const TextFilter = () => {
  const { handleName, filters } = useContext(Context);
  const { filterByName } = filters;
  const { name } = filterByName;
  return (
    <div>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          name="name"
          onChange={ handleName }
          value={ name }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
};

export default TextFilter;
