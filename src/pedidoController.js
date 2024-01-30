const db = require('./db');
const Joi = require('joi');

// Listar todos os pedidos
exports.listarPedidos = (req, res) => {
  db.query('SELECT * FROM pedido', (err, result) => {
    if (err) {
      console.error('Erro ao buscar pedidos:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json(result);
  });
};

// Buscar um único pedido por ID
exports.buscarPedidoId = (req, res) => {
    const { id } = req.params;
  
    db.query('SELECT * FROM pedido WHERE id = ?', id, (err, result) => {
      if (err) {
        console.error('Erro ao buscar pedido:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).json({ error: 'Pedido não encontrado' });
        return;
      }
  
      res.json(result[0]); // Retorna o primeiro pedido encontrado (deve ser único)
    });
  };  

// Buscar pedidos por CPF
exports.buscarPedidosCpf = (req, res) => {
    const { cpf } = req.params;
  
    db.query('SELECT * FROM pedido WHERE cpf = ?', cpf, (err, result) => {
      if (err) {
        console.error('Erro ao buscar pedidos por CPF:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).json({ error: 'Nenhum pedido encontrado para este CPF' });
        return;
      }
  
      res.json(result);
    });
  };  

// Adicionar um novo pedido
exports.adicionarPedido = (req, res) => {
  const { forma_pagto, qtde_itens, valor_total, cpf, id_entregador } = req.body;
  const novoPedido = { forma_pagto, qtde_itens, valor_total, cpf, id_entregador };

  db.query('INSERT INTO pedido SET ?', novoPedido, (err, result) => {
    if (err) {
      console.error('Erro ao adicionar pedido:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Pedido adicionado com sucesso' });
  });
};

// Atualizar um pedido
exports.atualizarPedido = (req, res) => {
  const { id } = req.params;
  const { forma_pagto, qtde_itens, valor_total, cpf } = req.body;
  const pedidoAtualizado = { forma_pagto, qtde_itens, valor_total, cpf, id_entregador };

  db.query('UPDATE pedido SET ? WHERE id = ?', [pedidoAtualizado, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar pedido:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Pedido atualizado com sucesso' });
  });
};

// Deletar um pedido
exports.deletarPedido = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM pedido WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar pedido:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Pedido deletado com sucesso' });
  });
};
