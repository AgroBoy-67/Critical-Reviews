async function load() {
    const resposta = await fetch("/api/logado");
    if (!resposta.ok) {
        location.href = "index.html";
    }
}

load();