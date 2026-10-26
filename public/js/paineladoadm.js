document.querySelectorAll("[data-consulta]").forEach((botao) => {
    botao.addEventListener("click", () => {
        const consulta = {
            todos: ["/api/usuarios", "Todos"],
            id: ["/api/usuariosID", "Por ID"],
            idDesc:["/api/usuariosIDdesc", "Por ID desc"],
            nome: ["/api/usuariosAZ", "De A a Z"],
            nomeDesc: ["/api/usuariosZA", "De Z a A"],
            contar:["/api/contar", "Contar"]
        };
        const [url, titulo] = consulta[botao.dataset.consulta];
        enviarConsulta(url, titulo)
    })
})

const divCadastrados = document.getElementById("cadastrados")

async function enviarConsulta(url,titulo) {
    try {
        const resposta = await fetch(url)
        const resultado = await resposta.json();
        if(!resposta.ok) {
            throw new Error(resultado.erro)
        }
        if (titulo === "Contar") {
            divCadastrados.innerHTML = `Total de cadastros: ${resultado.total}`
        }
        else {
            criarLinha(resultado)
        }
    }
    catch (erro) {
        alert(erro.message)
    }
}

const exibirConsulta = document.getElementById("exibirConsulta")

function criarLinha(resultado) {
    exibirConsulta.replaceChildren()
    if (resultado.length === 0) {
        exibirConsulta.innerHTML = `
            <p>Nenhum usuário cadastrado encontrado. </p>
        `
    }
    else {
        for (const usuario of resultado) {
            const p = document.createElement("p")
            p.textContent = `ID: ${usuario.id} | Nome: ${usuario.nome} | Email: ${usuario.email}`
            exibirConsulta.appendChild(p)
        }
    }
}