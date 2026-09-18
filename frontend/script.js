//
// AOS E GSAP
//

AOS.init ({
    duration: 800, once:true
})

gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline();

gsap.to("#logo", {
    rotate: 5,
    duration: 2.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
})

gsap.to(".aDeNavegacao", {
    scale: 1.2,
    duration: 2.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
})

gsap.to(".titulosLogin", {
    rotate: 2,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
})

//
//  FIM AOS GSAP
//

// --| INDEX.HTML/CADASTRA.HTML

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
        console.log(login);

        const usuario = NewUser.usuarios.find(
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
        const email = emailLogin.value.trim();
        const senha = senhaLogin.value.trim();
        if(email === "" || senha === "") {
            alert("Complete os campos.")
            return;
        }
        NovoUser.verificarEmailLogin(email, senha)
    })}



}
// FIM INDEX.HTML/CADASTRA.HTML

// --| AVALIAR.HTML

//colocar a imagem selecionada para o usuario ver
document.getElementById('fotoForm').addEventListener('change', function(e) {
    document.getElementById("textoVazio").style.display = "none";
    const file = e.target.files[0];
    if (file) {
        const preview = document.getElementById('preview');
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
    }
});


//formulario para enviar a avaliação
const form = document.getElementById("formEnviar");

let estrelas = 0;

const btn1Estrela = document.getElementById("estrela1"); const btn2Estrela = document.getElementById("estrela2"); const btn3Estrela = document.getElementById("estrela3"); const btn4Estrela = document.getElementById("estrela4"); const btn5Estrela = document.getElementById("estrela5");
const estrela1Vazia = document.getElementById("estrelaVazia1"); const estrela2Vazia = document.getElementById("estrelaVazia2"); const estrela3Vazia = document.getElementById("estrelaVazia3"); const estrela4Vazia = document.getElementById("estrelaVazia4"); const estrela5Vazia = document.getElementById("estrelaVazia5"); 
const estrela1Cheia = document.getElementById("estrelaCheia1"); const estrela2Cheia = document.getElementById("estrelaCheia2"); const estrela3Cheia = document.getElementById("estrelaCheia3"); const estrela4Cheia = document.getElementById("estrelaCheia4"); const estrela5Cheia = document.getElementById("estrelaCheia5"); 

function dar1estrela() {
    estrelas = 0;

    estrela1Vazia.style.display = "none";
    estrela1Cheia.style.display = "block";

    estrela2Vazia.style.display = "block";
    estrela2Cheia.style.display = "none";

    estrela3Vazia.style.display = "block";
    estrela3Cheia.style.display = "none";

    estrela4Vazia.style.display = "block";
    estrela4Cheia.style.display = "none";

    estrela5Vazia.style.display = "block";
    estrela5Cheia.style.display = "none";

    estrelas = 1;
}

function dar2estrela() {
    estrelas = 0;

    estrela1Vazia.style.display = "none";
    estrela1Cheia.style.display = "block";

    estrela2Vazia.style.display = "none";
    estrela2Cheia.style.display = "block";

    estrela3Vazia.style.display = "block";
    estrela3Cheia.style.display = "none";

    estrela4Vazia.style.display = "block";
    estrela4Cheia.style.display = "none";

    estrela5Vazia.style.display = "block";
    estrela5Cheia.style.display = "none";

    estrelas = 2;
}

function dar3estrela() {
    estrelas = 0;

    estrela1Vazia.style.display = "none";
    estrela1Cheia.style.display = "block";

    estrela2Vazia.style.display = "none";
    estrela2Cheia.style.display = "block";

    estrela3Vazia.style.display = "none";
    estrela3Cheia.style.display = "block";

    estrela4Vazia.style.display = "block";
    estrela4Cheia.style.display = "none";

    estrela5Vazia.style.display = "block";
    estrela5Cheia.style.display = "none";

    estrelas = 3;
}

function dar4estrela() {
    estrelas = 0;

    estrela1Vazia.style.display = "none";
    estrela1Cheia.style.display = "block";

    estrela2Vazia.style.display = "none";
    estrela2Cheia.style.display = "block";

    estrela3Vazia.style.display = "none";
    estrela3Cheia.style.display = "block";

    estrela4Vazia.style.display = "none";
    estrela4Cheia.style.display = "block";

    estrela5Vazia.style.display = "block";
    estrela5Cheia.style.display = "none";

    estrelas = 4;
}

function dar5estrela() {
    estrelas = 0;

    estrela1Vazia.style.display = "none";
    estrela1Cheia.style.display = "block";

    estrela2Vazia.style.display = "none";
    estrela2Cheia.style.display = "block";

    estrela3Vazia.style.display = "none";
    estrela3Cheia.style.display = "block";

    estrela4Vazia.style.display = "none";
    estrela4Cheia.style.display = "block";

    estrela5Vazia.style.display = "none";
    estrela5Cheia.style.display = "block";

    estrelas = 5;
}

class Avaliação {
    constructor(categoria,nomeItem,descricao,estrelas) {
        this.categoria = categoria;
        this.nomeItem = nomeItem;
        this.descricao = descricao;
        this.estrelas = estrelas;
    }
}

let avaliacoes = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const categoria = document.getElementById("categoria").value;
    const nomeDaCoisa = document.getElementById("nomeDaCoisa").value;
    const avaliacao = document.getElementById("avaliacao").value;

    if (estrelas == 0 || nomeDaCoisa.trim() == "" || avaliacao.trim() == "") {
        alert("Preencha todas as informações...")
        return;
    }

    const novaAvaliacao = new Avaliação(categoria,nomeDaCoisa,avaliacao,estrelas)

    avaliacoes.push(novaAvaliacao);
    alert("Avaliação enviada!");

    estrelas = 0;

    estrela1Vazia.style.display = "block";
    estrela1Cheia.style.display = "none";

    estrela2Vazia.style.display = "block";
    estrela2Cheia.style.display = "none";

    estrela3Vazia.style.display = "block";
    estrela3Cheia.style.display = "none";

    estrela4Vazia.style.display = "block";
    estrela4Cheia.style.display = "none";

    estrela5Vazia.style.display = "block";
    estrela5Cheia.style.display = "none";
    form.reset();

    console.log(novaAvaliacao)
})

//  --| FIM AVALIAR.HTML

// --| INICIO.HTML



// FIM INICIO.HTML

