async function load() {
    const resposta = await fetch("/api/logado");
    if (!resposta.ok) {
        location.href = "index.html";
    }
}
load();

const formBt = document.getElementById("mudar-nome");
 
formBt.addEventListener("submit", async function(e) {
    e.preventDefault();
    const nome = document.getElementsByClassName("novoNome")[0].value.trim();
 
        if (nome === "") {
            alert("Digite um nome!");
            return;
        }
 
        const resposta = await fetch("/api/perfil", {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ nome:nome })
        })
 
        if(resposta.ok) {
            const nomes = document.getElementById("nomeAlterar");

            nomes.innerHTML = nome;
            
            alert("Nome alterado com sucessso");
        } else {
        alert("Erro ao alterar nome!");
        }
})

nome()

async function nome() {
    const nome = document.getElementById("nomeAlterar");
    const nomehe = document.getElementById("nomehead");
    //get
        const resposta = await fetch("/api/perfil")
    
        const dados = await resposta.json()
        console.log(dados)
    nome.innerHTML = dados; //igual a resposta do get
    nomehe.innerHTML = dados;
}

const ButtonSair = document.getElementById("logoutButtonSair");
ButtonSair.addEventListener("click", async () => {
    try {
        await fetch("/api/logout",{
            method: "POST"
        })
    } finally {
        location.href = "index.html"
    }
});