const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const apiItemsURL = 'https://api.mercadolibre.com/items/';

let price = [];

function setPrice() {
  const totalPrice = document.querySelector('span.total-price');
  const priceObject = price;
  const sum = priceObject.reduce((acc, value) => acc + value.salePrice, 0);
  totalPrice.innerText = sum;
}

function restoreProductList() {
  const savedProducts = localStorage.getItem('savedProducts');
  if (savedProducts != null) {
    return JSON.parse(savedProducts);
  }
  return price;
} 

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  const list = document.querySelectorAll('.cart__item');
  const element = event.target;
  console.log(element); 
  let elementIndex = -1;
  list.forEach((item, index) => {
    if (item === element) {
      elementIndex = index;
    }
  });
  price.splice(elementIndex, 1);
  element.remove();
  setPrice();
  localStorage.setItem('savedProducts', JSON.stringify(price));
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'li') {
    e.addEventListener('click', cartItemClickListener);
  }
  return e;
}

const loading = () => createCustomElement('span', 'loading', 'loading...');

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createLoadItems() {
  const ol = document.querySelector('.cart__items');
  const rescueProduct = restoreProductList();
  rescueProduct.forEach(({ name, salePrice, sku }) => {
    const li = createCartItemElement({ name, salePrice, sku });
    ol.appendChild(li);
  });
  price = rescueProduct;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function getObject(element) {
  const cartSection = document.querySelector('section.cart');
  cartSection.appendChild(loading());
  const skuID = getSkuFromProductItem(element);
  const endpoint = `${apiItemsURL}${skuID}`;
  const itemsResult = await (await fetch(endpoint)).json();
  cartSection.lastChild.remove();
  return itemsResult;
}

function setLocalStorage({ sku, name, salePrice }) {
  price.push({ sku, name, salePrice });
  localStorage.setItem('savedProducts', JSON.stringify(price));
}

async function appendProduct(event) {
  const ol = document.querySelector('.cart__items');
  const itemsResult = await getObject(event.target.parentNode);
  const { id: sku, title: name, price: salePrice } = itemsResult;
  const result = createCartItemElement({ sku, name, salePrice });
  setLocalStorage({ sku, name, salePrice });
  ol.appendChild(result);
  setPrice();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', appendProduct);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  return section;
}

async function createProductList(element) {
  const itemsElements = document.querySelector('.items');
  itemsElements.appendChild(loading());
  const endpoint = `${apiURL}${element}`;
  const object = await (await fetch(endpoint)).json();
  itemsElements.lastChild.remove();
  const { results } = object;

  results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const productItem = createProductItemElement({ sku, name, image });
    itemsElements.appendChild(productItem);
  });
}

function clearCart() {
  const list = document.querySelectorAll('.cart__item');
  list.forEach((item) => {
    item.remove();
  });
  price = [];
  setPrice();
  localStorage.setItem('savedProducts', JSON.stringify(price));
}

function clearCartButtonEventListener() {
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', clearCart);
}

window.onload = () => {
  createProductList('computador');
  createLoadItems();
  clearCartButtonEventListener();
};