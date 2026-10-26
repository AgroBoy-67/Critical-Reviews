async function load() {
    const resposta = await fetch("/api/logado");
    if (!resposta.ok) {
        location.href = "index.html";
    }
}

load();

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
