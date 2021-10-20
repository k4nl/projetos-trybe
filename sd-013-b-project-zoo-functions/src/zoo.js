const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return data.species.filter((specie) => ids.includes(specie.id)); // codigo baseado no do Jõao Vanelli
}

function getAnimalsOlderThan(animal, age) {
  const findAnimal = data.species.find((type) => type.name === animal); // busca o objeto do animal escolhido
  const animais = findAnimal.residents; // guarda o array dos animais daquela especie (fuinha)
  return animais.every((resident) => resident.age >= age); // verifica se as idades de todos animais possuem a idade minima.
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) { // verifica se tem parametro se não tem retorna objeto vazio
    return {};
  }
  return data.employees.find(((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName));
  // procura o parametro na chave de primeiro nome ou ultimo nome do objeto empregado
  // se achar retorna o objeto.
}

function createEmployee(personalInfo, associatedWith) {
  const fullInfo = { ...personalInfo, ...associatedWith };
  return fullInfo;
}

function isManager(id) {
  const managers = data.employees.map((employee) => employee.managers);
  const arrayManager = managers.reduce((acc, curr) => acc.concat(curr));
  return arrayManager.some((employeeId) => employeeId === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const checkPerson = (element = []) => element;
  const fullInfos = {
    id,
    firstName,
    lastName,
    managers: checkPerson(managers),
    responsibleFor: checkPerson(responsibleFor),
  };
  return data.employees.push(fullInfos);
}

function countAnimals(speciesName) {
  const allAnimalsObject = {};
  function allAnimals() {
    data.species.forEach((animalName) => {
      allAnimalsObject[animalName.name] = animalName.residents.length;
    });
  }
  allAnimals();
  if (!speciesName) {
    return allAnimalsObject;
  }
  return allAnimalsObject[speciesName];
}

function calculateEntry(entrants = 0) {
  const entrantsArray = Object.entries(entrants);
  return entrantsArray
    .reduce((acc, [typeEntrant, amount]) => acc + data.prices[typeEntrant] * amount, 0);
}

// new Set permite armazenar valores unicos ( valor repetido não armazena ); [ ne, nw, se, sw]
const locations = () => [...new Set(data.species.map((specie) => specie.location))]; // spread em um array

function withoutParameter() {
  const fullAnimalMap = {};
  locations().forEach((location) => {
    fullAnimalMap[location] = data.species.filter((specie) => specie.location === location)
      .map((animal) => animal.name);
  });
  return fullAnimalMap;
}

function withSexParameter(options) {
  const { sex, sorted } = options;
  const obj = {}; // objeto vazio
  locations().forEach((location) => { // para cada localização [ NE, NW, SE, SW]
    obj[location] = data.species.filter((specie) => specie.location === location) // {chave do obj = NE} : [ primeiro filtra pela localização]
      .map((animal) => { // [ depois cria um array com as seguintes regras]
        let allResidents = animal.residents; // vamos procurar dentro de todos os residents ( animais )
        if (sex) { // primeiro verifica o sexo, se tiver esse parametro
          allResidents = allResidents.filter((resident) => resident.sex === sex); // os residents agora serão somente os da mesma localização e do mesmo sexo
        }
        let residentName = allResidents.map(({ name }) => name); // agora so precisamos de um array com os nomes dos animais
        if (sorted) {
          residentName = residentName.sort(); // transforma o array de nomes em ordem alfabetica
        }
        return { [animal.name]: residentName }; // cria o objeto
      });
    return true;
  });
  return obj;
}

function getAnimalMap(options = {}) {
  const { includeNames, sex, sorted } = options;
  const animalMap = withoutParameter();
  const animalMapWithSex = withSexParameter(options);
  if (!includeNames) {
    return animalMap;
  }
  if (sex) {
    return animalMapWithSex;
  }
  if (sorted) {
    return animalMapWithSex;
  }
  return animalMapWithSex;
}

function getSchedule(dayName) {
  const object = Object.entries(data.hours);
  const schedule = {}; // objeto para guardar cada interaçã
  object.forEach((day) => { // usei o for each para retornar um objeto
    const [dia, { open: openTime, close: closeTime }] = day; // destruturação do objeto para acessar cada valor
    schedule[dia] = `Open from ${openTime}am until ${12 - (24 - closeTime)}pm`; // converte horario para pm
    if (openTime === 0 && closeTime === 0) {
      schedule[dia] = 'CLOSED'; // se o tempo de abrir e fechar for 0, retorna fechado
    }
  });
  if (!dayName) { // se não tiver parametro retorna o objeto inteiro
    return schedule;
  }
  return { [dayName]: schedule[dayName] }; // trecho retirado do codigo do caribé
}

function getOldestFromFirstSpecies(id) {
  const employeeInfo = data.employees.find((employee) => id === employee.id);
  const firstSpecieId = employeeInfo.responsibleFor[0];
  const specieInfo = data.species.find((specie) => specie.id === firstSpecieId);
  const speciesResidents = specieInfo.residents.reduce((acc, curr) => {
    if (curr.age > acc.age) {
      return curr;
    }
    return acc;
  });
  return [speciesResidents.name, speciesResidents.sex, speciesResidents.age];
}

function increasePrices(percentage) {
  const formatedPercentage = 1 + (percentage / 100);
  data.prices.Adult = Math.round(data.prices.Adult * formatedPercentage * 100) / 100;
  data.prices.Child = Math.round(data.prices.Child * formatedPercentage * 100) / 100;
  data.prices.Senior = Math.round(data.prices.Senior * formatedPercentage * 100) / 100;
}

function getEmployeeCoverage(idOrName) {
  const employeeData = {};
  data.employees.forEach((employee) => {
    const { firstName: fn, lastName: ln, responsibleFor: animal } = employee;
    const fullname = `${fn} ${ln}`;
    const animalSearch = animal.map((animalId) => data.species
      .find((specie) => animalId === specie.id).name);
    employeeData[fullname] = animalSearch;
  });
  const findEmployee = data.employees.find((emp) =>
    emp.id === idOrName || emp.lastName === idOrName || emp.firstName === idOrName);
  if (!idOrName) {
    return employeeData;
  }
  const fullName = `${findEmployee.firstName} ${findEmployee.lastName}`;
  return { [fullName]: employeeData[fullName] };
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
