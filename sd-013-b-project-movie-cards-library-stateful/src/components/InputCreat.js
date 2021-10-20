const input = [
  {
    tag: 'input',
    type: 'text',
    id: 'text-input',
    key: 1,
    label: 'Inclui o texto',
    name: 'searchText',
  },

  {
    tag: 'input',
    type: 'checkbox',
    id: 'checkbox-input',
    key: 2,
    label: 'Mostrar somente favoritos',
    name: 'bookmarkedOnly',
    checked: false,
  },

  {
    tag: 'select',
    id: 'select-input',
    key: 3,
    label: 'Filtrar por gênero',
    name: 'selectedGenre',
  },
];

export default input;
