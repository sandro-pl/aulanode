const express = require('express');
const db = require('./db');
const Joi = require('joi');
const bcrypt = require('bcrypt');

// Esquema de validação do cliente usando Joi
const clienteSchema = Joi.object({
  cpf: Joi.string().length(11).required(),
  nome: Joi.string().required(),
  endereco: Joi.string().required(),
  bairro: Joi.string().required(),
  complemento: Joi.string(),
  cep: Joi.string().required(),
  telefone: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

// Middleware de tratamento de erros
function errorHandler(err, req, res, next) {
  console.error(err); // Log do erro para futura análise
  res.status(500).json({ error: 'Erro interno do servidor' });
}

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM cliente');
    res.json(result);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Buscar um único cliente por CPF
exports.buscarCliente = async (req, res) => {
  try {
    const { cpf } = req.params;
    const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
    if (result.length === 0) {
      res.status(404).json({ error: 'Cliente não encontrado' });
    } else {
      res.json(result[0]);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Adicionar um novo cliente
exports.adicionarCliente = async (req, res) => {
  try {
    const { cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha } = req.body;
    const { error } = clienteSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: 'Dados de cliente inválidos' });
      return;
    }
    const hash = await bcrypt.hash(senha, 10);
    const novoCliente = { cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha: hash };
    await db.query('INSERT INTO cliente SET ?', [novoCliente]);
    res.json({ message: 'Cliente adicionado com sucesso' });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Atualizar um cliente
exports.atualizarCliente = async (req, res) => {
  try {
    const { cpf } = req.params;
    const { nome, endereco, bairro, complemento, cep, telefone, email, senha } = req.body;
    const { error } = clienteSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: 'Dados de cliente inválidos' });
      return;
    }
    const hash = await bcrypt.hash(senha, 10);
    const clienteAtualizado = { nome, endereco, bairro, complemento, cep, telefone, email, senha: hash };
    await db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf]);
    res.json({ message: 'Cliente atualizado com sucesso' });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Deletar um cliente
exports.deletarCliente = async (req, res) => {
  try {
    const { cpf } = req.params;
    await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = app; // Exportando para uso em outras partes do servidor
