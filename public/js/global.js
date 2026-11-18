async function nome() {
    const nome = document.getElementById("nomeAlterar");
    const nomehe = document.getElementById("nomehead");

    const resposta = await fetch("/api/perfil");
    const dados = await resposta.json();

    if (resposta.ok) {
        if (nome) {
            nome.textContent = dados;
        }

        if (nomehe) {
            nomehe.textContent = dados;
        }
    }
}

nome();