const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
require("dotenv").config()

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: "",
    database: process.env.DB_NAME
}

let senha = 'JLGMadmin321Critial';
let email = 'CriticalReviewADM@gmail.com';

async function consultar (sql, valores = []) {
    const conexao = await mysql.createConnection(dbConfig);
    try {
        const [resultado] = await conexao.execute(sql, valores);
        return resultado 
    } finally {
        await conexao.end()
    }
}
async function autenticarAdm(){
    const senhaHash = await bcrypt.hash(senha, 10)

    const sql = `
    INSERT INTO ADM (senhaHash, email) VALUES (?,?)
    `
    const resultado = await consultar(sql, [
        senhaHash.trim(),
        email.trim()
    ])
    console.log("Admin cadastrado com sucesso.")
    console.log("ID:", resultado.insertId);
}

autenticarAdm();