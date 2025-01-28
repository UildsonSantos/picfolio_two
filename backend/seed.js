const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Image = require('./models/Image');

dotenv.config();
const connectDB = require('./config/db');

const seedData = async () => {
    try {
        await connectDB();
        console.log('Conectado ao banco de dados');

        // Limpar coleções
        await User.deleteMany();
        await Image.deleteMany();

        // Adicionar usuários
        const users = [
            { nome: 'Usuário 1', email: 'usuario1@example.com', senha: await bcrypt.hash('senha123', 10) },
            { nome: 'Usuário 2', email: 'usuario2@example.com', senha: await bcrypt.hash('senha123', 10) },
            { nome: 'Usuário 3', email: 'usuario3@example.com', senha: await bcrypt.hash('senha123', 10) },
        ];

        const createdUsers = await User.insertMany(users);
        console.log('Usuários inseridos com sucesso');

        // Adicionar imagens
        const images = [
            { title: 'Imagem 1', description: 'Descrição da imagem 1', url: 'https://example.com/image1.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 2', description: 'Descrição da imagem 2', url: 'https://example.com/image2.jpg', user: createdUsers[1]._id },
            { title: 'Imagem 3', description: 'Descrição da imagem 3', url: 'https://example.com/image3.jpg', user: createdUsers[2]._id },
        ];

        await Image.insertMany(images);
        console.log('Imagens inseridas com sucesso');
        process.exit();
    } catch (err) {
        console.error(`Erro ao inserir dados: ${err.message}`);
        process.exit(1);
    }
};

seedData();
