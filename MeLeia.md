 - CONTADOR DE DROP TABLE NO SQL: 4 - 

TABELA DE AVISO:

AVISOS DO LUIZ: 

- GLOBAL.CSS: Esse arquivo deve ser linkado a todas as páginas .html, pois ele possuí as configurações que todas as páginas devem ter.
- PASTA DE FOTOS: Essa pasta esta dentro da pasta do CSS (/css/fotos), e caso queira salvar alguma imagem coloque ela nessa pasta.
- PASTA DE FONTES: Essa pasta esta dentro da pasta do CSS (/css/fontes), e caso queira salvar alguma fonte coloque ela nessa pasta.

FIM DO AVISOS DO LUIZ

AVISOS DO GUSTAVO: 

-CRIE O ARQUIVO .ENV

DB_HOST=localhost
DB_USER=root
DB_PORT=3306
DB_NAME=CriticalReviews
JWT_SECRET= comando mencionado na linha 23 :/

 - COMANDO JWT PRA COLOCAR NO TERMINAL:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

E VC PROVAVELMENTE TERÁ QUE FAZER OS DOWLOAD DO NPM JÁ Q O GIT NÃO GOSTA MT DO NODE_MODULES  
 - COMANDO PRO DOWNLOAD:
npm install express mysql2 bcrypt cookie-parser helmet jsonwebtoken dotenv

FIM DOS AVISOS DO GUSTAVO