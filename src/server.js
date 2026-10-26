//definindo as extensões baixados
const express = require ('express')
const mysql = require ('mysql2/promise')
const bcrypt = require ('bcrypt')
const  cookieParser = require ("cookie-parser")
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

function admin (res, usuario) {
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

//Cadastro
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
        INSERT INTO Usuario (nome, email, senhaHash) 
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

        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({erro: 'Esse e-mail já está cadastrado.'});
        }
        return res.status(409).json({erro: 'erro de conexão'})
    }
})

//Login
app.post('/api/login', async (req, res) =>{

    try{
    const {emailL, senhaL} = req.body
    if(!emailL || !senhaL){
        return res.status(400).json({erro: 'Preencha todos os campos'})
    }

    const sql = `SELECT * from Usuario WHERE email = ?`
    const resultado = await consultar(sql, [
            emailL.trim().toLowerCase()
            ])
            
     if (resultado.length === 0) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos'
            })
        }

        const senhaVerify = await bcrypt.compare(
            senhaL,
            resultado[0].senhaHash
        )
        if (!senhaVerify) {
            return res.status(401).json({erro: 'E-mail ou senha incorretos'})
        }
        login(res, resultado[0])
        return res.json({mensagem: 'Login realizado com sucesso!'})

        } 
        catch(erro) {
        console.error(erro)
        return res.status(500).json({
            erro: 'Erro interno do servidor'
        })
    }
})

//ADM
app.post('/api/admin', async (req, res) =>{

    try{
       const {email, senha} = req.body

       if(!email || !senha){
        return res.status(400).json({erro: 'Preencha todos os campos'})
       }
       const sql = `SELECT * FROM ADM WHERE email = ?`
       const resultado = await consultar(sql, [
        email.trim().toLowerCase()
       ])
       
     if (resultado.length === 0) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos'
            })
        }

        const senhaVerify = await bcrypt.compare(
            senha,
            resultado[0].senhaHash
        )
        if (!senhaVerify) {
            return res.status(401).json({erro: 'E-mail ou senha incorretos'})
        }
        admin(res, resultado[0])
        return res.json({mensagem: 'Login de ADM realizado com sucesso!'})

        } 
        catch(erro) {
        console.error(erro)
        return res.status(500).json({
            erro: 'Erro interno do servidor'
        })
    }
})

//Consultas ADM
async function consultar(sql, valores = []) {
    const conexao = await mysql.createConnection(dbConfig)
    try {
        const [resultado] = await conexao.execute(sql, valores)
        return resultado
    }
    finally {
        await conexao.end()
    }
}

app.get("/api/usuarios", async (req,res) => {
    try {
        const usuarios = await consultar(
            "SELECT id,nome,email FROM Usuario"
        )
        res.json(usuarios)
    }
    catch (erro) {
        res.status(500).json({
            erro: "Erro ao consultar o banco de dados."
        })
    }
})


app.get("/api/usuariosID", async (req,res) => {
    try {
        const usuarios = await consultar(
            "SELECT id,nome,email FROM Usuario ORDER BY id"
        )
        res.json(usuarios)
    }
    catch (erro) {
        res.status(500).json({
            erro: "Erro ao consultar o banco de dados."
        })
    }
})


app.get("/api/usuariosIDdesc", async (req,res) => {
    try {
        const usuarios = await consultar(
            "SELECT id,nome,email FROM Usuario ORDER BY id DESC"
        )
        res.json(usuarios)
    }
    catch (erro) {
        res.status(500).json({
            erro: "Erro ao consultar o banco de dados."
        })
    }
})

app.get("/api/usuariosAZ", async (req,res) => {
    try {
        const usuarios = await consultar(
            "SELECT id,nome,email FROM Usuario ORDER BY nome"
        )
        res.json(usuarios)
    }
    catch (erro) {
        res.status(500).json({
            erro: "Erro ao consultar o banco de dados."
        })
    }
})

app.get("/api/usuariosZA", async (req,res) => {
    try {
        const usuarios = await consultar(
            "SELECT id,nome,email FROM Usuario ORDER BY nome DESC"
        )
        res.json(usuarios)
    }
    catch (erro) {
        res.status(500).json({
            erro: "Erro ao consultar o banco de dados."
        })
    }
})


app.get("/api/contar", async (req,res) => {
    try {
        const usuarios = await consultar(
            "SELECT COUNT(*) AS total FROM Usuario"
        )
        res.json(usuarios[0])
    }
    catch (erro) {
        res.status(500).json({
            erro: "Erro ao consultar o banco de dados."
        })
    }
})

app.listen(3000, () =>{
    console.log('conectado na porta 3000 com sucesso')
})