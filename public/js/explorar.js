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

        BaseAvaliacoes.innerHTML += avaliacoes.map(avaliacao => `
            <div class="card-avaliacao">
                <h2>${avaliacao.nomeItem}</h2>
                <p>Publicado por: ${avaliacao.nomeUsuario}</p>
                <p>Categoria: ${avaliacao.categoria}</p>
                <p>${avaliacao.estrelas}</p>
                <img src="${avaliacao.fotoURL}" alt="Imagem da avaliação">

            </div>
        `)

    } catch (erro) {
        console.error(erro);
        BaseAvaliacoes.innerHTML = "<p>Erro ao carregar avaliações.</p>";
    }
}

carregarAvaliacoes();