async function load() {
    const resposta = await fetch("/api/logado");
    if (!resposta.ok) {
        location.href = "index.html";
    }
}
load();

const mensagem = document.getElementById("mensagem");
const enviar = document.getElementById("enviar");
const mensagens = document.getElementById("mensagens");

enviar.addEventListener("click", enviarMensagem);

async function enviarMensagem() {
    const texto = mensagem.value.trim();

    if (!texto) return;

    mensagens.innerHTML += `<p class="usuario">${texto}</p>`;

    mensagem.value = "";

    try {
        const resposta = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensagem: texto })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro);
        }

        mensagens.innerHTML += `<p class="bot">${resultado.resposta}</p>`;

    } catch (erro) {
        mensagens.innerHTML += `<p class="bot">Erro ao conversar com o assistente.</p>`;
        console.log(erro);
    }
}
