const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config(); // Carrega as configurações de .env

const app = express();
app.use(express.json());
app.use(cors());

// Importando arquivos de rotas
const clientesRoutes = require('./routes/clientesRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');

// Aplicando as rotas ao aplicativo
app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);

// Configurando o servidor para ouvir em uma porta específica
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
