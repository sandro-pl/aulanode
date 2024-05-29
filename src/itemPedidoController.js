const db = require('./db');

// Listar todos os itens pedidos
exports.listarItensPedidos = (req, res) => {
  db.query('SELECT * FROM item_pedido', (err, result) => {
    if (err) {
      console.error('Erro ao buscar item pedido:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json(result);
  });
};

// Buscar um único item pedido por ID
exports.buscarItensPedidoId = (req, res) => {
    const { id } = req.params;
  
    db.query('SELECT * FROM item_pedido WHERE id = ?', id, (err, result) => {
      if (err) {
        console.error('Erro ao buscar item pedido:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).json({ error: 'Item pedido não encontrado' });
        return;
      }
  
      res.json(result[0]); // Retorna o primeiro pedido encontrado (deve ser único)
    });
  };  

// Adicionar um novo item pedido
exports.adicionarItensPedido = (req, res) => {
  const { qtde, valor_parcial, id_produto, id_pedido } = req.body;
  const novoItemPedido = { qtde, valor_parcial, id_produto, id_pedido };

  db.query('INSERT INTO item_pedido SET ?', novoItemPedido, (err, result) => {
    if (err) {
      console.error('Erro ao adicionar item pedido:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Item pedido adicionado com sucesso' });
  });
};

// Atualizar um pedido
exports.atualizarItensPedido = (req, res) => {
  const { id } = req.params;
  const { qtde, valor_parcial, id_produto, id_pedido } = req.body;
  const itemPedidoAtualizado = { qtde, valor_parcial, id_produto, id_pedido };

  db.query('UPDATE item_pedido SET ? WHERE id = ?', [itemPedidoAtualizado, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar item pedido:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Item pedido atualizado com sucesso' });
  });
};

// Deletar um pedido
exports.deletarItemPedido = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM item_pedido WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar item pedido:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Item pedido deletado com sucesso' });
  });
};
