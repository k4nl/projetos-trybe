import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services';

const Context = createContext();

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [planetsCopy, setPlanetsCopy] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const fetchData = async () => {
    const { results } = await getPlanets();
    results.forEach((element) => delete element.residents);
    setPlanets(results);
    setPlanetsCopy(results);
  };

  const handleName = ({ target }) => {
    setFilter({
      ...filters,
      filterByName: { ...filters.filterByName, name: target.value },
    });
  };

  const handleSubmit = (state) => {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length !== 0) {
      filterByNumericValues.forEach(({ column }) => {
        if (column !== state.column) {
          setFilter({
            ...filters,
            filterByNumericValues: [...filters.filterByNumericValues, state],
          });
        }
      });
    } else {
      setFilter({
        ...filters,
        filterByNumericValues: [state],
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const { filterByNumericValues } = filters;
    const { filterByName: { name } } = filters;
    const nameFilter = planets.filter((planet) => planet.name
      .toLocaleLowerCase()
      .includes(name.toLocaleLowerCase()));
    let selectFilter = [];
    if (filterByNumericValues.length !== 0) {
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        selectFilter = nameFilter.filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[column]) > Number(value);
          } if (comparison === 'menor que') {
            return Number(planet[column]) < Number(value);
          }
          return Number(planet[column]) === Number(value);
        });
      });
      setPlanetsCopy(selectFilter);
    } else {
      setPlanetsCopy(nameFilter);
    }
  }, [filters, planets]);

  const context = {
    planets,
    planetsCopy,
    setPlanets,
    filters,
    setFilter,
    handleName,
    handleSubmit,
  };
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, Provider };
