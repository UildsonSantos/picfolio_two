const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
