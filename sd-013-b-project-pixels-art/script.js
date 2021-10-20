let numberOflines = 5;
const inputOfLines = document.querySelector('#board-size');
const inputButton = document.querySelector('#generate-board');

inputButton.addEventListener('click', changeNumberOfLines);

function changeNumberOfLines () {
  const board = document.querySelector('#pixel-board');
  board.innerHTML = '';
  numberOflines = inputOfLines.value; 
  if (numberOflines === '') {
    return window.alert('Board inválido!');
  } else if (numberOflines < 5) {
    numberOflines = 5;
  } else if (numberOflines >= 50 ) {
    numberOflines = 50;
  }
  fillBoard();
}
function chooseColorPalette() {
  const colors = document.getElementsByClassName('color'); // array colors [0,1,2,3]
  colors[0].style.backgroundColor = 'black'; // indice que sempre vai ser preto
  for (let i = 1; i < colors.length; i += 1) { // passa em todos, exceto o primeiro, os indices do array
    const randomRed = Math.random() * 256; // cria um numero toda vez que o for roda o indice.
    const randomGreen = Math.random() * 256;
    const randomBlue = Math.random() * 256;
    colors[i].style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
  } // template literals - permite colocar variaveis dentro de uma string /
}

chooseColorPalette();

// cria um pixel com a classe pixel

function createPixel() {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  return pixel;
}

// preenche a linha com os pixels

function fillLine(line) {
  numberOflines.value
  for (let i = 0; i < numberOflines; i += 1) {
    const pixel = createPixel();
    line.appendChild(pixel);
  }
}

// cria a linha preenchida

function createLine() {
  const line = document.createElement('div');
  line.className = 'line';
  fillLine(line);
  return line;
}

// cria o board com as linhas de acordo com a quantidade de linha

function fillBoard() {
  for (let i = 0; i < numberOflines; i += 1) {
    const board = document.getElementById('pixel-board');
    const lines = createLine();
    board.appendChild(lines);
  }
}

fillBoard();

function newClass(event) {
  const pallet = document.querySelector('.selected');
  pallet.classList.remove('selected');
  event.target.classList.add('selected');
}

function selectColor() {
  const pallet = document.querySelectorAll('.color');
  for (let i = 0; i < pallet.length; i += 1) {
    pallet[i].addEventListener('click', newClass);
  }
}
selectColor();

function setNewColor(event) {
  const colorSelected = document.querySelector('.selected').style.backgroundColor;
  const { target } = event;
  if (target.className === 'pixel') { // se eu tiver clicando no pixel faça a ação // if criado para não ocorrer de clicar fora do pixel e colorir, no caso colorir o pai.
    target.style.backgroundColor = colorSelected; // colore o pixel
  }
}

function addPixelBoardEventListener() {
  const pixelBoard = document.querySelector('#pixel-board');
  pixelBoard.addEventListener('click', setNewColor);
}
addPixelBoardEventListener();

function clearBoard() {
  const pixels = document.querySelectorAll('.pixel'); // pixels [0,1,2,3...]
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}

function addClearBoardEventListener() {
  const button = document.querySelector('#clear-board');
  button.addEventListener('click', clearBoard);
}
addClearBoardEventListener();
