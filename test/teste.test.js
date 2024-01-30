const teste = require("../src/teste");

// testando valores
test('soma de 5 + 2 é igual a 7', () => {
    expect(teste.soma(5, 2)).toBe(7);
});

test('divisão de 10 / 2 é igual a 5', () => {
    expect(teste.div(10, 2)).toBe(5);
});

test('divisão de 10 / 3 é igual a 3.33', () => {
    expect(teste.div(10, 3)).toBeCloseTo(3.33, 2);
});




test('verifica se 5 é positivo', () => {
    expect(teste.verificaNumero(1)).toBe('positivo');
});
test('verifica se -3 é negativo', () => {
    expect(teste.verificaNumero(-3)).toBe('negativo');
});
test('verifica se 0 é zero', () => {
    expect(teste.verificaNumero(0)).toBe('zero');
});













//testando string
test('verifica se "hello" é uma string', () => {
    expect(teste.ehString('hello')).toBe(true);
});

test('verifica se 42 não é uma string', () => {
    expect(teste.ehString(42)).toBe(false);
});




//testando objetos/vetores/arrays
test('retorna lista de números pares até 6', () => {
    expect(teste.numerosPares(6)).toEqual([2, 4, 6]);
});




//toBeTruthy = combina com qualquer coisa que uma instrução if trata como verdadeiro
test('verifica se a função retorna true ao validar string com pelo menos 3 caracteres', () => {
    expect(teste.validarString('ab')).toBeTruthy();
});





//toBeFalsy = combina com qualquer coisa que uma instrução if trata como falso
test('verifica se a função retorna false ao validar número maior ou igual a 10', () => {
    expect(teste.validarNumero(15)).toBeFalsy();
});




//toBeUndefined = verifica se é undefined (não contém um valor, chave ou propriedade correto).
test('verifica se a função retorna undefined ao obter propriedade inexistente', () => {
    const objeto = { nome: 'Sandro', idade: 24 };
    expect(teste.obterPropriedade(objeto, 'email')).toBeUndefined();
});



//toBeDefined = ao contrário de undefined
test('verifica se a função retorna um objeto definido ao criar usuário válido', () => {
    expect(teste.criarUsuario('Sandro', 29)).toBeDefined();
});





//toBeNull = corresponde a apenas nulo
test('verifica se a função retorna null ao pesquisar produto inexistente', function () {
    expect(teste.pesquisarProduto('Smartwatch')).toBeNull();
});







//toBeGreaterThan = compara se o valor e maior que o esperado
test('verifica se a função retorna um número maior ao dobrar', () => {
    expect(teste.dobrarNumero(5)).toBeGreaterThan(5);
});






//toBeLessThan = compara se o valor e menor que o esperado
test('verifica se a função retorna um número menor que o dobro', () => {
    expect(teste.dobrarNumero(5)).toBeLessThan(20);
});





//toBeGreaterThanOrEqual = verifica se o valor é maior ou igual ao original
test('verifica se a função retorna um salário maior ou igual após o aumento', () => {
    expect(teste.aumentarSalario(1000, 10)).toBeGreaterThanOrEqual(1100);
});



//toBeLessThanOrEqual = verifica se o valor é menor ou igual ao original
test('verifica se a função retorna um salário menor ou igual após o aumento', () => {
    expect(teste.aumentarSalario(1000, 10)).toBeLessThanOrEqual(1100);
});





//toMatch = verifica strings são iguais
test('verifica se a função retorna um endereço de e-mail formatado corretamente', () => {
    expect(teste.formatarEmail('sandro', 'senac.br')).toMatch('sandro@senac.br');
});







//toContain = verifica se o vetor ou objeto contém um valor
test('verifica se a função retorna true ao verificar a presença de um elemento na lista', () => {
    const lista = ['maçã', 'banana', 'laranja'];
    const elemento = 'banana';
    const listaModificada = teste.contemElemento(lista, elemento)
    expect(listaModificada).toContain(elemento);
});






//exercicio 01
test('verifica se a função mescla corretamente dois objetos', () => {
    const objeto1 = [1, 2];
    const objeto2 = [3, 4];
    const resultado = teste.mesclarObjetos(objeto1, objeto2);
    expect(resultado).toEqual([1, 2, 3, 4]);
});





//exercicio 02
test('verifica se a função identifica corretamente números primos', () => {
    expect(teste.ehPrimo(4)).toBeTruthy();
    expect(teste.ehPrimo(4)).toBeFalsy();
});





//exercicio 03
test('verifica se a função lança um erro ao tentar dividir por zero', () => {
    expect(teste.dividirPorZero(10, 0)).toBe('erro');
    expect(teste.dividirPorZero(10, 2)).toBe(5);
});