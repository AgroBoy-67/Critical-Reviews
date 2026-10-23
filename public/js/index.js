const FormLogin = document.getElementById('FormLogin');
const FormCadastro = document.getElementById('FormCadastro')

if(FormLogin || FormCadastro){

class Registro{
    constructor( id, nome, email,senha){
        this.id = id
        this.senha = senha
        this.email = email
        this.nome = nome
    }
}

class Login{
    constructor(email, senha){
        this.senha = senha
        this.email = email
    }

}

class Gerenciador{
    constructor(){
        this.proximoId = 1
        this.usuarios = []
    }

verificarEmail(email) {
    return this.usuarios.some(
        usuario => usuario.email === email
    )
}

    salvarUser(nome, emailC, senha){
        const NewUser = new Registro( this.proximoId, nome, emailC, senha)
        this.usuarios.push(NewUser)
        this.proximoId++
        return NewUser;
    }

        verificarEmailLogin(email, senha){
        const login = new Login(email, senha);

        const usuario = this.usuarios.find(
            usuario => usuario.email === login.email
        );
        if (!usuario) {
            alert("Usuário não encontrado");
            return;
        }
        if (usuario.senha !== login.senha) {
            alert("Senha incorreta.");    
        return;
        } 
        alert("Login realizado!");
    }

}

const NovoUser = new Gerenciador();

const email = document.getElementById('EmailC');
const nome = document.getElementById('Nome');
const senha = document.getElementById('SenhaC');
const senhaCC = document.getElementById('SenhaCC');

const emailL = document.getElementById('Email');
const senhaL = document.getElementById('Senha');


if(FormCadastro){
FormCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailC = email.value.trim();
    const nomeC = nome.value.trim();
    const senhaI = senha.value.trim();
    const senhaC = senhaCC.value.trim();

    if ( emailC === "" || nomeC === "" || senhaI === "" || senhaC === "") {
        alert("Complete os campos vazios")
        return;
    }
    if(senhaI !== senhaC){
        alert("As senhas não são iguais.")
        return
    }

    if(NovoUser.verificarEmail(emailC)){
        alert('Esse email já existe.')
    }

    else{
        NovoUser.salvarUser(nomeC, emailC, senhaI);
        alert("Usuário cadastrado com sucesso.")
        console.log(NovoUser.usuarios);
        FormCadastro.reset()
    }
})}

    if(FormLogin){
    FormLogin.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = emailL.value.trim();
        const senha = senhaL.value.trim();
        if(email === "" || senha === "") {
            alert("Complete os campos.")
            return;
        }
        NovoUser.verificarEmailLogin(email, senha)
    })}
}