const db = require('./db');//IMPORTANDO O NOSSO MÓDULO DE CONEXÃO COM O BANCO.

const Joi = require('joi');
//JOI - valida se esta estrutura de dados atende a uma validação criada no banco, impedindo que o erro passe por aqui e chegue até o banco.

const bcrypt = require('bcrypt');
//BCRYPT -é um método de criptografia do tipo hash para senhas
//com ele iremos proteger a senha digitada pelo usuário 

// Validação dos dados
//o JOI permite que os dados sejam validados de acordo com as regras definidas no banco
const clienteSchema = Joi.object({
  cpf: Joi.string().length(11).required(),//cpf tem que ter o tamanho de 11 digitos e ser preenchido
  nome: Joi.string().required(),//nome tem que ser preenchido
  endereco: Joi.string().required(),//endereço tem que ser preenchido
  bairro: Joi.string().required(),//bairro tem que ser preenchido
  complemento: Joi.string(),//complemento é opcional
  cep: Joi.string().required(),//cep tem que ser preenchido
  telefone: Joi.string().required(),//telefone tem que ser preenchido
  email: Joi.string().email().required(),//email tem que ter um formato de email e ser preenchido
  senha: Joi.string().min(6).required(),// senha tem que ter no mínimo 6 digitos e ser preenchido
});

// Listar todos os clientes
// QUERY acessa objeto de querystring da requisição 
exports.listarClientes = (req, res) => {
  db.query('SELECT * FROM cliente', (err, result) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json(result);
  });
};

// Buscar um único cliente por CPF
exports.buscarCliente = (req, res) => {
  const { cpf } = req.params; //acessa o cpf do cliente na rota
  db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, result) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Cliente não encontrado' });
      return;
    }

    res.json(result[0]); // Retorna o primeiro cliente encontrado (deve ser único)
  });
};

// Adicionar um novo cliente
exports.adicionarCliente = (req, res) => {
  const { cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha } = req.body; // req.body acessa objeto do corpo da requisição que foi recebido.

  const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha });//clienteSchema aqui utilizamos o joi para verificar os dados recebidos e garantir a integridade para só depois adicionar no banco.

  if (error) {
    res.status(400).json({ error: 'Dados de cliente inválidos' });
    return;
  }

  //Com o bcrypt passamos a senha(cliente) e o nível 10 como referência de encriptação, retornando o código hash gerado. 
  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      console.error('Erro ao criptografar a senha:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    const novoCliente = {
      cpf,
      nome,
      endereco,
      bairro,
      complemento,
      cep,
      telefone,
      email,
      senha: hash//senha recebe criptografia do hash
      //no banco a senha tem que ter tamanho de 100
    };

    db.query('INSERT INTO cliente SET ?', novoCliente, (err, result) => {
      if (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
      res.json({ message: 'Cliente adicionado com sucesso' });
    });
  });
};

// Atualizar um cliente
exports.atualizarCliente = (req, res) => {
  const { cpf } = req.params;
  const { nome, endereco, bairro, complemento, cep, telefone, email, senha } = req.body;

  const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, complemento, cep, telefone, email, senha });

  if (error) {
    res.status(400).json({ error: 'Dados de cliente inválidos' });
    return;
  }

  //Aqui ao acionar o bcrypt passamos a senha e o nível 10 como referência de encriptação, retornando o código hash gerado.
  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      console.error('Erro ao criptografar a senha:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }    
    const clienteAtualizado = {
      nome,
      endereco,
      bairro,
      complemento,
      cep,
      telefone,
      email,
      senha: hash // Aqui passamos a senha criptografada
    };

    db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
      res.json({ message: 'Cliente atualizado com sucesso' });
    });
  });
}

// Deletar um cliente
exports.deletarCliente = (req, res) => {
  const { cpf } = req.params;
  db.query('DELETE FROM cliente WHERE cpf = ?', cpf, (err, result) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json({ message: 'Cliente deletado com sucesso' });
  });
};