const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const autenticarToken = require('../middleware/autenticarToken'); 

router.use(express.json());

router.get('/', autenticarToken, clienteController.listarClientes);
router.get('/:cpf', autenticarToken, clienteController.buscarCliente);
router.post('/', clienteController.adicionarCliente);
router.patch('/:cpf', autenticarToken, clienteController.atualizarCliente);
router.delete('/:cpf', clienteController.deletarCliente);

module.exports = router;
