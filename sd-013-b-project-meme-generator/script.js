/* O PASSO A PASSO DE CADA DESAFIO ESTÁ NO ARQUIVO
passo-a-passo.txt. PEÇO DESCULPAS SE NÃO ENTENDEREM
ALGUM DOS PASSOS, EU NÃO ESCREVO TAO BEM
*/
function inputToMemeContainer(event) {
  const memeInput = document.querySelector('#meme-text');
  memeInput.innerText = event.target.value;
}
function addMemeInputEventListener() {
  const inputText = document.querySelector('#text-input'); // esse é o target
  inputText.addEventListener('input', inputToMemeContainer); // input.text é cara que dispara o evento
}
function imageToMemeContainer(event) {
  const memeOutPut = document.querySelector('#meme-image');
  const imageFile = event.target.files[0];
  memeOutPut.src = URL.createObjectURL(imageFile);
}
function addImgInputEventListener() {
  const memeInput = document.querySelector('#meme-insert');
  memeInput.addEventListener('change', imageToMemeContainer); // 'change' usei da documentação do lucas caribé.
}
function changeRed() {
  const memeContainer = document.querySelector('#meme-image-container');
  memeContainer.style.border = '3px dashed rgb(255, 0, 0)';
}
function changeBlue() {
  const memeContainer = document.querySelector('#meme-image-container');
  memeContainer.style.border = '5px double rgb(0, 0, 255)';
}
function changeGreen() {
  const memeContainer = document.querySelector('#meme-image-container');
  memeContainer.style.border = '6px groove rgb(0, 128, 0)';
}
function addButtonRedEventListener() {
  const red = document.querySelector('#fire');
  const blue = document.querySelector('#water');
  const green = document.querySelector('#earth');
  red.addEventListener('click', changeRed);
  blue.addEventListener('click', changeBlue);
  green.addEventListener('click', changeGreen);
}
window.onload = () => {
  addMemeInputEventListener();
  addImgInputEventListener();
  addButtonRedEventListener();
};
