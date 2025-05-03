# 1. Imagem base do Node
FROM node:18-alpine

# 2. Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# 3. Copia o package.json e package-lock.json e instala dependências
COPY package*.json ./
RUN npm install --production

# 4. Copia todo o restante do código
COPY . .

# 5. Expõe a porta que o app vai escutar
EXPOSE 3000

# 6. Comando padrão para iniciar o servidor
CMD ["npm", "start"]
