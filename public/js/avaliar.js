const fotoForm = document.getElementById('fotoForm');
const form = document.getElementById("formEnviar");

if (fotoForm) {
    fotoForm.addEventListener('change', function(e) {
        document.getElementById("textoVazio").style.display = "none";
        const file = e.target.files[0];
        if (file) {
            const preview = document.getElementById('preview');
            preview.src = URL.createObjectURL(file);
            preview.style.display = 'block';
        }
    });
}


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
    // se eu clicar na mesma quantidade que já está ativa, zera tudo//
    if (quantia === ras) {
        quantia = 0;
    }
 
    // Salva a nova quantidade na sua variável
    ras = quantia;
 
    // ele passa pelas 5 estrelas e decide o que fazer com cada uma
    for (let i = 0; i < 5; i++) {
        if (i < quantia) {
            // Se a posição atual for menor que a nota desejada, acende
            estrelasVazias[i].style.display = 'none';
            estrelasCheias[i].style.display = 'block';
        } else {
            // Se for maior ou igual, apaga (serve tanto para o restante quanto para quando voltar a nota)
            estrelasVazias[i].style.display = 'block';
            estrelasCheias[i].style.display = 'none';
        }
    }
}
 
// Inicializa visualmente todas para vazias e zera a variável
escolhaEstrelas(0);

class Avaliação {
    constructor(categoria,nomeItem,descricao,estrelas) {
        this.categoria = categoria;
        this.nomeItem = nomeItem;
        this.descricao = descricao;
        this.estrelas = estrelas;
    }
}

let avaliacoes = [];

const formEnviar = document.getElementById("formEnviar")
if (formEnviar) {
formEnviar.addEventListener("submit", function(e) {
    e.preventDefault();

    const categoria = document.getElementById("categoria").value;
    const nomeDaCoisa = document.getElementById("nomeDaCoisa").value;
    const avaliacao = document.getElementById("avaliacao").value;

    if (estrelas == 0 || nomeDaCoisa.trim() == "" || avaliacao.trim() == "") {
        alert("Preencha todas as informações...")
        return;
    }

    const novaAvaliacao = new Avaliação(categoria,nomeDaCoisa,avaliacao,estrelas)

    avaliacoes.push(novaAvaliacao);
    alert("Avaliação enviada!");
    estrelas = 0;
    formEnviar.reset();
    document.getElementById("preview").src = "";
    document.getElementById("preview").style.display = "none";
    document.getElementById("textoVazio").style.display = "block";
    console.log(novaAvaliacao)
})
}