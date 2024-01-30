//ARQUIVO ********** index.js **********
//CRIAÇÃO DE UMA APLICAÇÃO EXPRESS
const express = require('express');//IMPORTANDO EXPRESS
const path = require('path');//IMPORTANDO PATH
//O PATH RETORNA O CAMINHO DE FORMA DINÂMICA

//*****Configuração do Banco de Dados MySQL*****
const db = require('./db');//IMPORTANDO O NOSSO MÓDULO DE CONEXÃO COM O BANCO.

const app = express();
//O APP IRÁ RECEBER O EXPRESS E TODAS SUAS DEPENDÊNCIAS

//*****Configuração das rotas*****
const routes = require('./routes');//CHAMANDO O MÓDULO DAS ROTAS


app.use(express.json());//AQUI TRANSFORMAMOS OS DADOS QUE CHEGAM COMO BINARIO EM JSON

app.use('/', routes);
//APÓS DECLARAR NOSSAS ROTAS, AQUI FALAMOS PARA NOSSO APP USAR ELAS COMO REFERÊNCIA 

app.listen(3333, () => {
    console.log('SERVIDOR RODANDO')
})
//AQUI DEFINIMOS QUEM IRÁ ESCUTAR NOSSO CHAMADO E NOS RESPONDER




