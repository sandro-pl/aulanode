const express = require('express');//IMPORTANDO EXPRESS
const path = require('path');//IMPORTANDO PATH
//O PATH RETORNA O CAMINHO DE FORMA DINÂMICA

const router = express.Router();
// ISSO PERMITE QUE A GENTE CRIE DIFERENTES URLs E ENDPOINTs PARA QUE O FRONTEND POSSA FAZER CHAMADAS

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
}) 
// dentro do GET já definimos uma função anônima CALLBACK, que recebe uma requisição com o REQ e que retorna uma resposta com o RES
//AQUI DEFINIMOS NOSSA ROTA PARA O ARQUIVO HTML USANDO O PATH PARA SEMPRE RETORNAR DINAMICAMENTE O QUE VEM ANTES DA "/pages/home.html"
// TUDO QUE SE ENCONTRA DEPOIS DA BARRA / SERÃO NOSSAS ROTAS. 

const clienteController = require('./clienteController');
//CHAMANDO O ARQUIVO QUE CONTROLA O CLIENTE

const produtoController = require('./produtoController');
//CHAMANDO O ARQUIVO QUE CONTROLA O PRODUTO
const pedidoController = require('./pedidoController');
//CHAMANDO O ARQUIVO QUE CONTROLA O PEDIDO
const loginController = require('./loginController');
//CHAMANDO O ARQUIVO QUE CONTROLA O LOGIN
const itemPedidoController = require('./itemPedidoController');
//CHAMANDO O ARQUIVO QUE CONTROLA O ITEM


//AS ROTAS TERÃO SEMPRE O METODO HTTP E A URL
//TODA ROTA QUE PRECISAR DE AUTENTICACAO, DEVE UTILIZAR O AUTENTICAR TOKEN DE FORMA INDIVIDUAL OU COLETIVA

// Rotas para clientes
//GET: Método que solicita algum recurso ou objeto ao servidor
router.get('/clientes', loginController.autenticarToken, clienteController.listarClientes);
router.get('/clientes/:cpf',loginController.autenticarToken,clienteController.buscarCliente);

//POST: Aceita criar algum objeto do servidor.
router.post('/clientes', clienteController.adicionarCliente);
//PUT: Aceita substituir algum objeto do servidor.
//PATCH: Aceita alterar parcialmente algum objeto do servidor.
router.patch('/clientes/:cpf', loginController.autenticarToken, clienteController.atualizarCliente);
//DELETE: Informa por meio do URL o objeto a ser deletado.
router.delete('/clientes/:cpf', clienteController.deletarCliente);



// Rotas para produtos
router.get('/produtos', produtoController.listarProdutos);
router.get('/produtos/:id', produtoController.buscarProdutoId);
router.get('/produtos/nome/:nome_produto', produtoController.buscarProdutoNome);
router.post('/produtos', loginController.autenticarToken, produtoController.adicionarProduto);
router.patch('/produtos/:id', loginController.autenticarToken, produtoController.atualizarProduto);
router.delete('/produtos/:id', loginController.autenticarToken, produtoController.deletarProduto);

// Rotas para pedido
//QUANDO TODAS AS ROTAS PRECISAM DE AUTENTICACAO, USAMOS O ROUTER.USE
router.use('/pedido', loginController.autenticarToken);
//AQUI DEFINIMOS QUE TODAS AS ROTAS /PEDIDO TERÃO QUE PASSAR PELO AUTENTICAR TOKEN

router.get('/pedido', pedidoController.listarPedidos);
router.get('/pedido/:id', pedidoController.buscarPedidoId);
router.get('/pedido/idcliente/:id_cliente', pedidoController.buscarPedidosCpf);
router.post('/pedido', pedidoController.adicionarPedido);
router.patch('/pedido/:id', pedidoController.atualizarPedido);
router.delete('/pedido/:id', pedidoController.deletarPedido);

//Rotas para item de pedido
router.get('/item-pedido', itemPedidoController.listarItensPedidos);
router.get('/item-pedido/:id', itemPedidoController.buscarItensPedidoId);
router.post('/item-pedido', itemPedidoController.adicionarItensPedido);
router.patch('/item-pedido/:id', itemPedidoController.atualizarItensPedido);
router.delete('/item-pedido/:id', itemPedidoController.deletarItemPedido);

//Rota para o login
router.post('/login', loginController.loginCliente);

module.exports = router;