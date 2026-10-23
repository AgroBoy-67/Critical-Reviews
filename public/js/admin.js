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
    form.reset();
    } catch (erro) {
        alert(erro.message);
    }
});