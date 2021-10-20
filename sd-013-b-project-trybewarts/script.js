const firstName = document.querySelector('#input-name');
const lastName = document.querySelector('#input-lastname');
const emailInput = document.getElementById('input-email');
const house = document.querySelector('#house');

function authenticateLogin() { // função para autentificar o login
  const inputEmail = document.querySelector('#login');
  const inputPassword = document.querySelector('#senha');
  const fail = 'Login ou senha inválidos.';
  const sucess = 'Olá, Tryber!';
  if (inputEmail.value !== 'tryber@teste.com' || inputPassword.value !== '123456') {
    window.alert(fail);
  } else {
    window.alert(sucess);
  }
}
const buttonLogin = document.querySelector('#buttonLogin');
buttonLogin.addEventListener('click', authenticateLogin);

function authenticateCheckboxAgreement() { // função para a funcionalidade do botão;
  const inputAgreement = document.querySelector('#agreement'); // recuperando o input;
  const submitBtn = document.querySelector('#submit-btn'); // recuperando o button;
  if (inputAgreement.checked === true) { // se houver a propriedade checked no input;
    submitBtn.disabled = false; // não desabilite o botão;
  } else { // caso contrario;
    submitBtn.disabled = true; // desabilite o botão;
  }
}

const input = document.querySelector('#agreement');
input.addEventListener('click', authenticateCheckboxAgreement);

const textArea = document.querySelector('#textarea');
const counter = document.querySelector('#counter');
const maxLength = 500;

counter.innerText = String(maxLength);

function changeLetterCounter(event) {
  counter.innerText = maxLength - event.target.value.length;
}

textArea.addEventListener('keyup', changeLetterCounter);

function createElementP(string, inputs) {
  const elementP = document.createElement('p'); // cria um paragrafo
  elementP.innerText = `${string}${inputs}`;
  // string = 'Nome: ', 'Email: '... / inputs busca o value do input e concatena em uma string
  return elementP;
}

function rescueFamily() { // recupera o valor da familia selecionada
  const families = document.querySelectorAll('.radios');
  for (let i = 0; i < families.length; i += 1) {
    if (families[i].checked) {
      return families[i].value;
    }
  }
}

function rescueSubjects() { // pega os subject
  const selectedSubject = [];
  const subject = document.querySelectorAll('.subject');
  for (let i = 0; i < subject.length; i += 1) {
    if (subject[i].checked) {
      selectedSubject.push(` ${subject[i].value}`);
    }
  }
  return selectedSubject;
}

function rescueRate() {
  const rates = document.querySelectorAll('.rate-radio');
  for (let i = 0; i < rates.length; i += 1) {
    if (rates[i].checked) {
      return rates[i].value;
    }
  }
}

const leaveComents = document.querySelector('#textarea');
function submitForms() {
  const form = document.querySelector('#evaluation-form');
  const emailOutput = `${emailInput.value}`;
  const fullName = `${firstName.value} ${lastName.value}`;
  const houseChoosen = `${house.value}`;
  const familyChoosen = rescueFamily();
  const subjects = rescueSubjects();
  const rate = rescueRate();
  const comments = `${leaveComents.value}`;
  form.innerHTML = ''; // apaga o form
  form.appendChild(createElementP('Nome: ', fullName));
  form.appendChild(createElementP('Email: ', emailOutput));
  form.appendChild(createElementP('Casa: ', houseChoosen));
  form.appendChild(createElementP('Família: ', familyChoosen));
  form.appendChild(createElementP('Matérias: ', subjects));
  form.appendChild(createElementP('Avaliação: ', rate));
  form.appendChild(createElementP('Observações: ', comments));
}

const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', submitForms);

window.onload = function audiovol() {
  const audio = document.querySelector('#audio');
  audio.volume = 0.005;
};
