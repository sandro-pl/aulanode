exports.soma = (a, b) => {
    return a + b;
}
exports.sub = (a, b) => {
    return a - b;
}
exports.div = (a, b) => {
    return a / b;
}
exports.mult = (a, b) => {
    return a * b;
}



exports.verificaNumero = (numero) => {
    if (numero > 0) {
        return 'positivo';
      } else if (numero < 0) {
        return 'negativo';
      } else {
        return 'zero';
      }
}




exports.ehString = (valor) => {
    return typeof valor ==='string';
}


exports.numerosPares = (n) => {
    const pares = [];
    for (let i = 2; i <= n; i += 2) {
      pares.push(i);
    }
    return pares;
}




//toBeTruthy = combina com qualquer coisa que uma instrução if trata como verdadeiro
exports.validarString = (texto) =>{
  return texto.length >= 3;
}






//toBeFalsy = combina com qualquer coisa que uma instrução if trata como falso
exports.validarNumero = (numero) =>{
  return numero < 10;
}





//toBeUndefined = verifica se é undefined (algo não contém um valor, ou chave ou propriedade).
exports.obterPropriedade = (objeto, propriedade) =>{
  return objeto[propriedade];
}




//toBeDefined = ao contrário de undefined
exports.criarUsuario = (nome, idade) =>{
  if (!nome || !idade) {
    return undefined;
  }
  return { nome, idade };
}




//toBeNull = corresponde a apenas nulo
const produtos = [
  { id: 1, nome: 'Celular', preco: 999.99 },
  { id: 2, nome: 'Laptop', preco: 1499.99 },
];
exports.pesquisarProduto = (nome) =>{
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].nome === nome) {
      return produtos[i];
    }
  }
  return null;
}




//toBeGreaterThan = compara se o valor e maior que o esperado
exports.dobrarNumero = (numero) =>{
  return numero * 2;
}





//toBeGreaterThanOrEqual = verifica se o valor é maior ou igual ao original
//toBeLessThanOrEqual = verifica se o valor é menor ou igual ao original

exports.aumentarSalario=(salario, aumentoPorcentagem) =>{
  const aumento = salario * (aumentoPorcentagem / 100);
  return salario + aumento;
}



 

//toMatch = verifica strings
exports.formatarEmail = (usuario, dominio) =>{
  return `${usuario}@${dominio}`;
}






//toContain = verifica se o vetor ou objeto contém um valor
exports.contemElemento = (lista, elemento) => {
  return [lista,elemento];
}



//exercicio 01
exports.mesclarObjetos = (obj1, obj2) =>{
  return [...obj1,...obj2];
}



//exercicio 02
exports.ehPrimo = (numero) =>{
  if (numero < 2) {
    return false;
  }
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      return false
    };
  }
  return true;
}




//exercicio 02
exports.dividirPorZero = (dividendo, divisor) =>{
  if (divisor === 0) {
    return ('erro');
  }
  return dividendo / divisor;
}