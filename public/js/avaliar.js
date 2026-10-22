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