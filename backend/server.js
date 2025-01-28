const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(compression()); // Compressão de respostas
app.use(morgan('combined')); // Logs de requisições

// Sanitização de entradas
app.use(xss()); // Previne XSS
app.use(mongoSanitize()); // Previne NoSQL injection

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Rota básica
app.get('/', (req, res) => {
    res.send('Bem-vindo ao backend do Projeto 2!');
});

// Middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno no servidor' });
});

// Carregar certificado e chave
const privateKeyPath = process.env.PRIVATE_KEY_PATH;
const certificatePath = process.env.CERTIFICATE_PATH;

const options = {
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(certificatePath),
};

// Iniciar servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`Servidor HTTPS rodando em https://localhost:${PORT}`);
});
