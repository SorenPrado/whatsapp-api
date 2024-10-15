// Importando dependências
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const { baseWebhookURL } = require('./src/config');
require('dotenv').config();

// Inicializando o app
const app = express();

// Porta onde o servidor vai rodar
const port = process.env.PORT || 8080;

// Verifica se a variável de ambiente BASE_WEBHOOK_URL está definida
if (!baseWebhookURL) {
  console.error('BASE_WEBHOOK_URL environment variable is not available. Exiting...');
  process.exit(1); // Termina a aplicação com um código de erro
}

// Carregando o arquivo swagger.json
const swaggerDocument = require(path.join(__dirname, 'swagger.json'));

// Usando Swagger UI para gerar a documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definindo uma rota de exemplo (pode ser a sua API)
app.get('/', (req, res) => {
  res.send('Welcome to the WhatsApp Web API!');
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
