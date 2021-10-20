const olId = '#lista-tarefas';
function createLi() { // cria o elemento li com a classe tarefa, reseta sempre que a li for criada
  const li = document.createElement('li');
  const ol = document.querySelector(olId);
  const input = document.querySelector('#texto-tarefa');
  li.innerText = input.value;
  li.className = 'tarefa';
  ol.appendChild(li);
  input.value = '';
}
function addEventListenerButton() { // cria o event listener no botao de adicionar
  const addElementButton = document.getElementById('criar-tarefa');
  addElementButton.addEventListener('click', createLi);
}
function selectTask(event) { // cria a classe selected
  const tasks = document.querySelectorAll('.tarefa'); // sempre que for um array percorre ele com o for
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].classList.remove('selected');
  }
  event.target.classList.add('selected');
}
function completTask(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}
function clearTask() {
  const tasks = document.querySelector(olId).children;
  for (let i = tasks.length - 1; i >= 0; i -= 1) { // essa linha de codigo foi feita baseada no projeto do pedro spelta. Tentei fazer do indice 0 ate o ultimo, mas so apagava metade. Do ultimo ate o primeiro apaga todos.
    tasks[i].remove();
  }
}
function clearCompleted() {
  const completed = document.querySelectorAll('.completed');
  for (let i = completed.length - 1; i >= 0; i -= 1) {
    completed[i].remove();
  }
}
function removeSelected() { // remover o item riscado
  const selected = document.querySelector('.selected');
  selected.remove();
}
function up() { // subir o item selecionado
  const selected = document.getElementsByClassName('selected')[0]; // pega o primeiro elemento da lista
  const ol = document.getElementById('lista-tarefas'); // cria um array com os elementos da lista
  if (selected !== ol.firstChild && selected) { // elemento selecionado for diferente do primeiro ou do selecionado
    selected.previousSibling.before(selected); // coloca o proximo filho como antes do elemento selecionado
  }
}
function down() { // descer o item selecionado
  const selected = document.getElementsByClassName('selected')[0]; // pega o primeiro elemento da lista selected
  const ol = document.getElementById('lista-tarefas'); // cria um array com os elementos da lista
  if (selected !== ol.lastChild && selected) { // elemento selecionado for diferente do ultimo elemento ou do proprio selecionado
    selected.nextSibling.after(selected); // coloque o proximo elemento da lista como proximo do elemento selecionado
  }
}
// criar um objeto e colar dentro dele as classes e o innertext
/* div {
  innerText: "",
  class: '',
}
*/
function save() {
  const lis = document.querySelectorAll('.tarefa'); // [0,1,2,3]
  const savedItem = [];
  for (let i = 0; i < lis.length; i += 1) { // criar um array de objetos, cada li é um objeto, colocar a li no array de objetos, json stringfiy e json parse.
    savedItem.push({ innerText: lis[i].innerText, class: lis[i].getAttributeNode('class').value });
  }
  localStorage.setItem('savedTasks', JSON.stringify(savedItem)); // pegando um array js e transformando em objeto json
}

function restoreSavedTasks() {
  const ol = document.querySelector(olId);
  const saved = JSON.parse(localStorage.getItem('savedTasks')); //  pegando um objeto json e transformando em um array javascript
  if (saved != null) { // se tiver alguma coisa dentro do array
    for (let i = 0; i < saved.length; i += 1) {
      const li = document.createElement('li');
      li.innerText = saved[i].innerText;
      li.className = saved[i].class;
      ol.appendChild(li);
    }
  }
}

function addEventListener() { // cria o event listener nas li's
  const ol = document.querySelector(olId);
  const clearAll = document.querySelector('#apaga-tudo');
  const removeButton = document.querySelector('#remover-finalizados');
  const removeSelectedButton = document.querySelector('#remover-selecionado');
  const upButton = document.querySelector('#mover-cima');
  const downButton = document.querySelector('#mover-baixo');
  const saveButton = document.querySelector('#salvar-tarefas');
  ol.addEventListener('click', selectTask);
  ol.addEventListener('dblclick', completTask);
  clearAll.addEventListener('click', clearTask);
  removeButton.addEventListener('click', clearCompleted);
  removeSelectedButton.addEventListener('click', removeSelected);
  upButton.addEventListener('click', up);
  downButton.addEventListener('click', down);
  saveButton.addEventListener('click', save);
}
window.onload = () => {
  addEventListenerButton();
  addEventListener();
  restoreSavedTasks();
};
