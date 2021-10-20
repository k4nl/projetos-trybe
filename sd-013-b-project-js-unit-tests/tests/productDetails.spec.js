const assert = require('assert');
const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    const resultProduct = productDetails('xablau', 'xableu');
    const productId0 = [resultProduct[0].details.productId.substr(-3), resultProduct[1].details.productId.substr(-3)];

    // Teste que o retorno da função é um array.
    assert.strictEqual(typeof resultProduct, 'object')
    // Teste que o array retornado pela função contém dois itens dentro.
    assert.deepStrictEqual(Object.keys(resultProduct).length, 2);
    // Teste que os dois itens dentro do array retornado pela função são objetos.
    assert.deepStrictEqual(typeof Object.keys(resultProduct), 'object');
    // Teste que os dois objetos são diferentes entre si.
    assert.notDeepStrictEqual(Object.values(resultProduct[0]), Object.values(resultProduct[1]));
    // Teste que os dois productIds terminam com 123.
    assert.deepStrictEqual(productId0, ['123', '123']);  // .substr(-3);
  });
});

