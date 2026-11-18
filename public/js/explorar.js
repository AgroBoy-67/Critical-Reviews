async function load() {
    const resposta = await fetch("/api/logado");
    if (!resposta.ok) {
        location.href = "index.html";
    }
}
load();

//avaliações
async function carregarAvaliacoes() {

    const BaseAvaliacoes = document.getElementById("avaliacoes");

    try {
        const resposta = await fetch("/api/avaliacoes");
        const avaliacoes = await resposta.json();

        if (!resposta.ok) {
            throw new Error("Erro ao carregar avaliações");
        }

        if (avaliacoes.length === 0) {
            container.innerHTML = "<p>Nenhuma avaliação publicada ainda.</p>";
            return;
        }


BaseAvaliacoes.innerHTML = avaliacoes.map(avaliacao => `
    <div class="card-avaliacao">
        <div class="card-imagem">
            <img src="${avaliacao.fotoURL}" 
                 alt="Imagem de ${avaliacao.nomeItem}">
        </div>
        <div class="card-conteudo">
            <div class="card-topo">
                <span class="categoria-review">
                    ${avaliacao.categoria}
                </span>
                <span class="nota-review">
                    ★ ${avaliacao.estrelas}/5
                </span>
            </div>
            <h2>${avaliacao.nomeItem}</h2>
            <div class="card-rodape">
                <span class="autor-review">
                    Publicado por ${avaliacao.nomeUsuario}
                </span>
                <div class="votos-review">
                    <span>▲ ${avaliacao.upvotes}</span>
                    <span>▼ ${avaliacao.downvotes}</span>
                </div>
            </div>
        </div>
    </div>

`).join("");

    } catch (erro) {
        console.error(erro);
        BaseAvaliacoes.innerHTML = "<p>Erro ao carregar avaliações.</p>";
    }
}
carregarAvaliacoes();
