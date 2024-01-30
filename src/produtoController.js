const db = require('./db');

const Joi = require('joi');

const produtoSchema = Joi.object({
  //id: Joi.string().required(),
  nome_produto: Joi.string().required(),
  descricao: Joi.string().required(),
  valor: Joi.string().required(),
  imagem: Joi.string().required(),
});

// Listar todos os produtos
exports.listarProdutos = (req, res) => {
  db.query('SELECT * FROM produto', (err, result) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json(result);
  });
};

// Buscar um único produto por id
exports.buscarProdutoId = (req, res) => {
  const { id } = req.params; // req.params acessa os parametros

  db.query('SELECT * FROM produto WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Erro ao buscar produto:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'produto não encontrado' });
      return;
    }

    res.json(result[0]); // Retorna o primeiro produto encontrado (deve ser único)
  });
};

// Buscar produtos por nome
exports.buscarProdutoNome = (req, res) => {
    const { nome_produto } = req.params; // req.params acessa os parametros

    //LIKE com o operador % usado para buscar produtos cujo nome começa com o prefixo especificado na URL.
    db.query('SELECT * FROM produto WHERE nome_produto LIKE ?', [`${nome_produto}%`], (err, result) => {
      if (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: 'produto não encontrado' });
        return;
      }
      res.json(result); // Retorna o primeiro produto encontrado (deve ser único)
    });
  };

// Adicionar um novo produto
exports.adicionarProduto = (req, res) => {
  const { nome_produto, descricao, valor, imagem} = req.body; // req.body acessa objeto do corpo da requisição que foi recebido.

  const { error } = produtoSchema.validate({ nome_produto, descricao, valor, imagem });//produtoSchema aqui utilizamos o joi para verificar os dados recebidos e garantir a integridade para só depois adicionar no banco.

  if (error) {
    res.status(400).json({ error: 'Dados de produto inválidos' });
    return;
  }

  const novoproduto = {nome_produto, descricao, valor, imagem};

  db.query('INSERT INTO produto SET ?', novoproduto, (err, result) => {
    if (err) {
      console.error('Erro ao adicionar produto:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'produto adicionado com sucesso' });
  });
}

// Atualizar um produto
exports.atualizarProduto = (req, res) => {
  const { id } = req.params;
  const { nome_produto, descricao, valor, imagem } = req.body;

  const { error } = produtoSchema.validate({ id, nome_produto, descricao, valor, imagem });

  if (error) {
    res.status(400).json({ error: 'Dados de produto inválidos' });
    return;
  }

  const produtoAtualizado = { id, nome_produto, descricao, valor, imagem };

  db.query('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar produto:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'produto atualizado com sucesso' });
  });
}

// Deletar um produto
exports.deletarProduto = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM produto WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    res.json({ message: 'produto deletado com sucesso' });
  });
};
