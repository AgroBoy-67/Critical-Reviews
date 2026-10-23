const express = require ('express')
const mysql = require ('mysql2/promise')
const bcrypt = require ('bcrypt')
const cookieParser = require ("cookie-parser")
const helmet = require ("helmet");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser());
app.use(helmet());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: '',
    database: process.env.DB_NAME
}

const opcoesCookies = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"  
}

function login (res, usuario) {
    const token = jwt.sign(
        { sub: String(usuario.id)},
        process.env.JWT_SECRET
    )  
    res.cookie("acess_token", token, opcoesCookies)
}


if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("Ausência do JWT segredo")
}

async function consultar(sql, valores = []) {
    const conexao = await mysql.createConnection(dbConfig)
    try{
        const [resultado] = await conexao.execute(sql, valores)
        return resultado
    } finally{
        await conexao.end()
    }
}


app.post('/api/cadastro', async (req, res ) =>{
    try{
        const {nomeC, emailC, senhaC} = req.body
        if(!nomeC || !emailC || !senhaC){
            return res.status(400).json({erro: 'Preencha todos os campos'})
        }
        if(senhaC.length < 8){
             return res.status(400).json({erro: 'A senha deve ter no mínimo 8 caracteres'})
        }
        if(nomeC.trim().length < 3){
            return res.status(400).json({erro: 'O nome de usuário deve ter no mínimo 3 caracteres'})
        }

        const senhaHash = await bcrypt.hash(senhaC, 10)  
        const sql = ` 
        INSERT INTO Usuario (nomeC, emailC, SenhaHash) 
        VALUES (?,?,?)
        ` 

        const resultado = await consultar(sql, [
            nomeC.trim(),
            emailC.trim().toLowerCase(),
            senhaHash
            ])
        res.json({
            mensagem: 'Cadastro Realizado!',
            id: resultado.insertId
        })
    } catch(erro){
        return res.status(409).json({erro: 'erro de conexão'})
    }
})

app.post('/api/login', async (req, res) =>{
    const {emailL, senhaL} = req.body
    if(!emailL || !senhaL){
        return res.status(400).json({erro: 'Preencha todos os campos'})
    }

    const sql = `SELECT * from Uuario WHERE email = ?`
    const resultado = await consultar(sql, [
            emailL.trim().toLowerCase(),
            senhaHash
            ])
})





app.listen(3000, () =>{
    console.log('conectado na porta 3000 com sucesso')
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////