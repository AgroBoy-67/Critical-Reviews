from flask import Flask, request, send_file, jsonify
from dotenv import load_dotenv
from pathlib import Path
from io import BytesIO
from collections import Counter
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
 
 
app = Flask(__name__)
 
avaliar = []

#gerar gráficos
@app.post("/graficos")
def gerar_graficos():
    dados = request.get_json(silent=True) or {}
    avaliar = [
        {
            "nome": item["nomeItem"],
            "categoria": item["categoria"],
            "nota": int(item["estrelas"])
            }
        for item in dados.get("Review", [])
    ]
    if not avaliar:
        return jsonify({"erro": "Não existem dados suficientes para gerar gráficos"}), 400
    fig, axs = plt.subplots(1, 3, figsize=(12,5))
    #-----------1-----------#
    nomes = [a["nome"] for a in avaliar]
    notas = [a["nota"] for a in avaliar]
    axs[0].bar(nomes, notas, color="#345678")
    axs[0].set_title("Nota das Avaliações", fontsize=14, fontweight="bold")
    axs[0].set_ylim(0,5)
    axs[0].set_ylabel("Nota")
    axs[0].tick_params(axis="x", rotation=25)
    for label in axs[0].get_xticklabels():
        label.set_ha("right")
    #----------02-----------#
    notas_categoria = {}
    for item in avaliar:
        categoria = item["categoria"]
        if categoria not in  notas_categoria:
            notas_categoria[categoria] = []
        notas_categoria[categoria].append(item["nota"])
    medias = { categoria: sum(notas) / len(notas)
                    for categoria, notas in notas_categoria.items()}
    axs[1].bar(medias.keys(), medias.values())
    axs[1].set_title("Notas médias por categoria")
    axs[1].set_ylim(0,5)
    axs[1].tick_params(axis="x", rotation=30)
    #-----------03-----------#
    melhores = sorted(avaliar, key=lambda j:j["nota"], reverse=True)[:5]
    axs[2].barh(
        [j["nome"] for j in melhores],
        [j["nota"] for j in melhores]
    )
    axs[2].set_title("Top 5 mais bem avaliados", fontsize=14, fontweight="bold")
    axs[2].set_xlim(0, 5)
    axs[2].invert_yaxis()
 
    fig.tight_layout()
    buffer = BytesIO()
    fig.savefig(buffer, format="png", dpi=150)
    plt.close(fig)
    buffer.seek(0)
    return send_file(buffer, mimetype="image/png", as_attachment=False, download_name="graficos.png")
 
#Chat Bot
@app.route("/chat", methods=["POST"])
def chat():
    try:
        dados = request.get_json()
        mensagem = dados.get("mensagem", "")
        if len(mensagem) > 1000:
            return jsonify({"erro": "A mensagem é muito longa"}), 400
        resposta = responder(mensagem)
        return jsonify({"resposta": resposta})
    except Exception:
        return jsonify({"erro": "Erro no chatbot"}), 500
 

frases = [
    # SAUDAÇÕES
    "ola",
    "oi tudo bem",
    "ola como vai",
    "eai",
    "bom dia",
    "boa tarde",
    "boa noite",
    "oi tudo certo",

    # SOBRE O SITE
    "o que e o critical reviews",
    "para que serve esse site",
    "como funciona o site",
    "qual o objetivo do site",
    "o que posso fazer aqui",
    "me explica como funciona",
    "esse site serve para avaliar coisas",
    "quais conteudos posso encontrar",

    # AVALIAÇÕES
    "como faço uma avaliação",
    "como avaliar alguma coisa",
    "quero avaliar um produto",
    "como faço para dar estrelas",
    "posso avaliar filmes e jogos",
    "como publicar minha avaliação",
    "onde posso escrever minha opinião",
    "quero fazer uma review",

    # ESTRELAS E NOTAS
    "como funciona a nota de estrelas",
    "posso dar uma estrela",
    "qual a quantidade de estrelas",
    "como dar cinco estrelas",
    "posso mudar minha nota",
    "o que significa a avaliação de cinco estrelas",
    "como funciona a classificação",
    "a nota vai de um a cinco",

    # IMAGENS
    "como adicionar uma imagem na avaliação",
    "posso colocar uma foto",
    "como enviar uma imagem",
    "qual imagem posso utilizar",
    "posso adicionar uma capa",
    "como escolher uma foto para minha review",
    "tem como colocar imagem na avaliação",
    "quais imagens são permitidas",

    # CATEGORIAS
    "quais categorias existem",
    "posso avaliar jogos",
    "tem avaliações de filmes",
    "posso avaliar series",
    "tem como avaliar livros",
    "posso avaliar produtos",
    "quais coisas posso avaliar",
    "posso avaliar qualquer coisa",

    # PUBLICAÇÃO E CONTA
    "como publicar uma review",
    "como faço para enviar minha avaliação",
    "preciso ter uma conta para avaliar",
    "como criar uma conta",
    "como faço login",
    "como acessar minha conta",
    "como editar meu perfil",
    "como ver minhas avaliações",

    # EXPLORAR
    "onde vejo as avaliações",
    "como encontrar reviews",
    "quero ver avaliações de jogos",
    "como pesquisar avaliações",
    "onde ficam as avaliações publicadas",
    "como descobrir novas reviews",
    "posso ver avaliações de outras pessoas",
    "quero explorar o site",

    # INTERAÇÕES
    "como curtir uma avaliação",
    "para que serve o voto positivo",
    "como dar voto negativo",
    "posso interagir com avaliações",
    "como funciona a votação",
    "como demonstrar que gostei de uma review",
    "posso votar nas avaliações",
    "como funciona a comunidade",

    # DESPEDIDAS
    "tchau",
    "ate mais",
    "ate logo",
    "obrigado pela ajuda",
    "valeu",
    "foi muito util",
    "obrigado",
    "tenha um bom dia"
]

intencao = [
    # SAUDAÇÕES
    "saudacao", "saudacao", "saudacao", "saudacao",
    "saudacao", "saudacao", "saudacao", "saudacao",

    # SOBRE O SITE
    "sobre_site", "sobre_site", "sobre_site", "sobre_site",
    "sobre_site", "sobre_site", "sobre_site", "sobre_site",

    # AVALIAÇÕES
    "avaliacao", "avaliacao", "avaliacao", "avaliacao",
    "avaliacao", "avaliacao", "avaliacao", "avaliacao",

    # ESTRELAS E NOTAS
    "estrelas", "estrelas", "estrelas", "estrelas",
    "estrelas", "estrelas", "estrelas", "estrelas",

    # IMAGENS
    "imagens", "imagens", "imagens", "imagens",
    "imagens", "imagens", "imagens", "imagens",

    # CATEGORIAS
    "categorias", "categorias", "categorias", "categorias",
    "categorias", "categorias", "categorias", "categorias",

    # PUBLICAÇÃO E CONTA
    "conta", "conta", "conta", "conta",
    "conta", "conta", "conta", "conta",

    # EXPLORAR
    "explorar", "explorar", "explorar", "explorar",
    "explorar", "explorar", "explorar", "explorar",

    # INTERAÇÕES
    "interacoes", "interacoes", "interacoes", "interacoes",
    "interacoes", "interacoes", "interacoes", "interacoes",

    # DESPEDIDAS
    "despedida", "despedida", "despedida", "despedida",
    "despedida", "despedida", "despedida", "despedida"
]

 
df = pd.DataFrame({
    "frase": frases,
    "intencoes": intencao
})
X = df["frase"]
y = df["intencoes"]
 
X_treino, X_teste, y_treino, y_teste = train_test_split(X,y,test_size=0.25, random_state=42, stratify=y)
 
vetor = CountVectorizer(lowercase=True, strip_accents="unicode")
X_treino = vetor.fit_transform(X_treino)
X_teste = vetor.transform(X_teste)
 
modelo = MultinomialNB()
modelo.fit(X_treino, y_treino)
previsao = modelo.predict(X_teste)
acuracia = accuracy_score(y_teste, previsao)
print(f"Acuracia: {acuracia * 100:.2f}%")
 

respostas = {
    "saudacao": "Olá! Seja bem-vindo ao Critical Reviews. Como posso ajudar?",

    "sobre_site": "O Critical Reviews é uma plataforma onde você pode compartilhar opiniões e avaliações sobre diferentes tipos de conteúdo.",

    "avaliacao": "Para fazer uma avaliação, acesse a página de avaliar, escolha o que deseja avaliar, escreva sua opinião, adicione uma imagem e selecione de 1 a 5 estrelas.",

    "estrelas": "As avaliações utilizam uma classificação de 1 a 5 estrelas. Escolha a quantidade que melhor representa sua opinião.",

    "imagens": "Durante a criação da avaliação, você pode selecionar uma imagem adequada ao conteúdo avaliado. Ela não deve conter material impróprio.",

    "categorias": "Você pode encontrar diferentes categorias, como jogos, filmes, séries, livros e produtos.",

    "conta": "Acesse as opções de cadastro ou login para utilizar sua conta e gerenciar suas avaliações.",

    "explorar": "Na página Explorar você pode visualizar avaliações publicadas por outros usuários e conhecer novas opiniões.",

    "interacoes": "As avaliações possuem opções de votação para que você possa demonstrar se gostou ou não da opinião publicada.",

    "despedida": "Obrigado por utilizar o Critical Reviews! Até a próxima!"
}

 
def responder(mensagem):
    entrada = vetor.transform([mensagem])
    intencoes = modelo.predict(entrada)[0]
    probabilidade = modelo.predict_proba(entrada)[0]
    confianca = max(probabilidade)
    if confianca < 0.35:
        return "Desculpe, não entendi sua mensagem :("
    resposta = respostas[intencoes]
    return resposta
 
 
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=False)