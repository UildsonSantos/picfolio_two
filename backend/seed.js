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
            { title: 'Imagem 1', description: 'Descrição da imagem 1', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 2', description: 'Descrição da imagem 2', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 3', description: 'Descrição da imagem 3', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 4', description: 'Descrição da imagem 4', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 5', description: 'Descrição da imagem 5', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 6', description: 'Descrição da imagem 6', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 7', description: 'Descrição da imagem 7', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 8', description: 'Descrição da imagem 8', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 9', description: 'Descrição da imagem 9', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 10', description: 'Descrição da imagem 10', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 11', description: 'Descrição da imagem 11', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 12', description: 'Descrição da imagem 12', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 13', description: 'Descrição da imagem 13', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 14', description: 'Descrição da imagem 14', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 15', description: 'Descrição da imagem 15', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 16', description: 'Descrição da imagem 16', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 17', description: 'Descrição da imagem 17', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 18', description: 'Descrição da imagem 18', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 19', description: 'Descrição da imagem 19', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 20', description: 'Descrição da imagem 20', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 21', description: 'Descrição da imagem 21', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 22', description: 'Descrição da imagem 22', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 23', description: 'Descrição da imagem 23', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 24', description: 'Descrição da imagem 24', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 25', description: 'Descrição da imagem 25', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 26', description: 'Descrição da imagem 26', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 27', description: 'Descrição da imagem 27', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 28', description: 'Descrição da imagem 28', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 29', description: 'Descrição da imagem 29', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 30', description: 'Descrição da imagem 30', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 31', description: 'Descrição da imagem 31', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 32', description: 'Descrição da imagem 32', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 33', description: 'Descrição da imagem 33', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 34', description: 'Descrição da imagem 34', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 35', description: 'Descrição da imagem 35', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 36', description: 'Descrição da imagem 36', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 37', description: 'Descrição da imagem 37', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 38', description: 'Descrição da imagem 38', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 39', description: 'Descrição da imagem 39', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 40', description: 'Descrição da imagem 40', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 41', description: 'Descrição da imagem 41', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 42', description: 'Descrição da imagem 42', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 43', description: 'Descrição da imagem 43', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 44', description: 'Descrição da imagem 44', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 45', description: 'Descrição da imagem 45', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 46', description: 'Descrição da imagem 46', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 47', description: 'Descrição da imagem 47', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 48', description: 'Descrição da imagem 48', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 49', description: 'Descrição da imagem 49', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 50', description: 'Descrição da imagem 50', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 51', description: 'Descrição da imagem 51', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[0]._id },
            { title: 'Imagem 1', description: 'Descrição da imagem 1', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[1]._id },
            { title: 'Imagem 2', description: 'Descrição da imagem 2', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[1]._id },
            { title: 'Imagem 3', description: 'Descrição da imagem 3', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[1]._id },
            { title: 'Imagem 1', description: 'Descrição da imagem 1', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[2]._id },
            { title: 'Imagem 2', description: 'Descrição da imagem 2', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[2]._id },
            { title: 'Imagem 3', description: 'Descrição da imagem 3', url: 'https://tm.ibxk.com.br/2023/09/05/05140912022242.jpg', user: createdUsers[2]._id },
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
