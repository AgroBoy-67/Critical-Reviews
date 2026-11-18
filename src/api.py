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
 
 
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=False)