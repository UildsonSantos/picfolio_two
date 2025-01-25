const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');

dotenv.config();
const connectDB = require('./config/db');

const seedUsers = async () => {
    try {
        await connectDB();
        console.log('Conectado ao banco de dados');

        // Limpar coleção
        await User.deleteMany();

        // Adicionar usuários
        const users = [
            { nome: 'Usuário 1', email: 'usuario1@example.com', senha: await bcrypt.hash('senha123', 10) },
            { nome: 'Usuário 2', email: 'usuario2@example.com', senha: await bcrypt.hash('senha123', 10) },
            { nome: 'Usuário 3', email: 'usuario3@example.com', senha: await bcrypt.hash('senha123', 10) },
        ];

        await User.insertMany(users);
        console.log('Usuários inseridos com sucesso');
        process.exit();
    } catch (err) {
        console.error(`Erro ao inserir usuários: ${err.message}`);
        process.exit(1);
    }
};

seedUsers();
