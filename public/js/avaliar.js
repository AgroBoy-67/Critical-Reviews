
const fotoForm = document.querySelector('.imagemPreview-avaliar');
const formEnviar = document.getElementById("formEnviar");

// PREVIEW DA IMAGEM
if (fotoForm) {
    fotoForm.addEventListener('change', function (e) {
        const file = e.target.files[0];

        if (file) {
            document.getElementById("textoVazio").style.display = "none";

            const preview = document.getElementById("preview");
            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";
        }
    });
}

// ESTRELAS
const estrelasVazias = [
    document.getElementById("estrelaVazia1"),
    document.getElementById("estrelaVazia2"),
    document.getElementById("estrelaVazia3"),
    document.getElementById("estrelaVazia4"),
    document.getElementById("estrelaVazia5")
];

const estrelasCheias = [
    document.getElementById("estrelaCheia1"),
    document.getElementById("estrelaCheia2"),
    document.getElementById("estrelaCheia3"),
    document.getElementById("estrelaCheia4"),
    document.getElementById("estrelaCheia5")
];

let ras = 0;

function escolhaEstrelas(quantia) {
    if (quantia === ras) {
        quantia = 0;
    }

    ras = quantia;

    for (let i = 0; i < 5; i++) {
        if (estrelasVazias[i] && estrelasCheias[i]) {
            if (i < ras) {
                estrelasVazias[i].style.display = "none";
                estrelasCheias[i].style.display = "block";
            } else {
                estrelasVazias[i].style.display = "block";
                estrelasCheias[i].style.display = "none";
            }
        }
    }
}

escolhaEstrelas(0);

// CLASSE DE AVALIAÇÃO
class Avaliação {
    constructor(categoria, nomeItem, descricao, estrelas) {
        this.categoria = categoria;
        this.nomeItem = nomeItem;
        this.descricao = descricao;
        this.estrelas = estrelas;
    }
}

let avaliacoes = [];

// ENVIAR A AVALIAÇÃO
if (formEnviar) {
    formEnviar.addEventListener("submit", function (e) {
        e.preventDefault();

        const categoria = document.getElementById("categoria").value;
        const nomeDaCoisa = document.getElementById("nomeDaCoisa").value;
        const avaliacao = document.getElementById("avaliacao").value;

        if (
            ras === 0 ||
            nomeDaCoisa.trim() === "" ||
            avaliacao.trim() === ""
        ) {
            alert("Preencha todas as informações e selecione as estrelas!");
            return;
        }

        const novaAvaliacao = new Avaliação(
            categoria,
            nomeDaCoisa.trim(),
            avaliacao.trim(),
            ras
        );

        avaliacoes.push(novaAvaliacao);

        console.log(novaAvaliacao);
        alert("Avaliação enviada!");

        formEnviar.reset();

        ras = 0;
        escolhaEstrelas(0);

        const preview = document.getElementById("preview");
        preview.src = "";
        preview.style.display = "none";
        document.getElementById("textoVazio").style.display = "block";
    });
}
