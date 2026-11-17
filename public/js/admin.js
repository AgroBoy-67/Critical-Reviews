const form = document.getElementById("form-ADM");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value;
    const dados = {
        senha: senha,
        email: email
    };
    try {
        const resposta = await fetch("/api/admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
    });
    const resultado = await resposta.json();
    if (!resposta.ok) {
      throw new Error(resultado.erro);
    }
    alert(resultado.mensagem)
    window.location.href = 'painelADM.html';
    form.reset();
    } catch (erro) {
        alert(erro.message);
    }
});

const grafico = document.getElementById("grafico")
function carregarGraficos() {
    grafico.src = "/api/graficos"
}
carregarGraficos();

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
