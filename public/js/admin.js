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
    alert(resultado.message)
    window.location.href = 'painelADM.html';
    form.reset();
    } catch (erro) {
        alert(erro.message);
    }
});

function mostrarErro(error) {
    if (error.status === 401) {
        location.href = "inicio.html"
    } else {
        alert(error.message)
    }
}
 
async function load() {
    await api("/api/admin")
}
 
load().catch(mostrarErro);