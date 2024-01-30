//*****Configuração do Banco de Dados MySQL*****

const mysql = require('mysql');//IMPORTANDO MYSQL

//Configurando uma conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'pizzaria',
});//PREENCHER DE ACORDO COM O SEU BANCO DE DADOS

//Testar a conexão com o MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

module.exports = db;
//AQUI DECLARAMOS QUE ESTA CONSTRUÇÃO SERÁ UM MÓDULO E QUE IREMOS EXPORTAR PARA SER USADO. SEQUIR INDEX.