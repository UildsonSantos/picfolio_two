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
            { nome: 'Azaleia', email: 'azaleia@exemplo.com', senha: await bcrypt.hash('catatua123', 10) },
            { nome: 'Rosa', email: 'rosa@exemplo.com', senha: await bcrypt.hash('catatua123', 10) },
            { nome: 'Jasmim', email: 'jasmim@exemplo.com', senha: await bcrypt.hash('catatua123', 10) },
        ];

        const createdUsers = await User.insertMany(users);
        console.log('Usuários inseridos com sucesso');

        // Adicionar imagens
        const images = [
            { title: 'Imagem 1', description: 'O dominicano Wagner Astacio compete na prova de salto em altura T63 em Paris 2024', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/7532/live/cbc20c90-6c45-11ef-8c32-f3c2bc7494c6.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 2', description: 'O chinês Wang Rui coloca todo o seu esforço no meio de uma partida de tênis de mesa em Paris 2024', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/ae42/live/14045200-6c47-11ef-b43e-6916dcba5cbf.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 3', description: 'Zakia Khudadadi fez história em Paris 2024 ao se tornar a primeira medalhista da equipe paraolímpica de refugiados. Ela ganhou a medalha de bronze no taekwondo', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/a1b4/live/08595f00-6c46-11ef-8c32-f3c2bc7494c6.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 4', description: 'Brenda Osnaya Alvarez, do México, faz uma proposta muito especial para sua namorada Jéssica em meio às provas de Paris 2024', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/47ed/live/c949eb30-6c46-11ef-8c32-f3c2bc7494c6.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 5', description: 'Edoardo Giordan, da Itália, comemora ponto conquistado contra o rival ucraniano durante disputa pela medalha de bronze na esgrima, sabre, categoria A', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/c1c7/live/94cd3910-6c47-11ef-b970-9f202720b57a.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 6', description: 'Sheetal Devi, da Índia, surpreendeu o mundo com suas habilidades com arco e flecha', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/7ff0/live/750ed780-6c5d-11ef-b970-9f202720b57a.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 7', description: 'Um clássico sul-americano: Argentina x Colômbia no futebol para cegos em Paris 2024', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/9fab/live/8195fbb0-6c48-11ef-8c32-f3c2bc7494c6.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 8', description: 'O mascote dos Jogos Paralímpicos foi o mesmo dos Olímpicos, mas com prótese', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/4a07/live/b08bc5d0-6c48-11ef-b43e-6916dcba5cbf.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 9', description: 'Gabriel Araújo se tornou uma das estrelas da natação paralímpica. O brasileiro conquistou três medalhas de ouro em sua categoria', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/a021/live/c3e0d550-6c50-11ef-b43e-6916dcba5cbf.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 10', description: 'Hocine Bettir, da Argélia, comemora terceiro lugar na prova de levantamento de peso em Paris 2024', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/5679/live/5a40a9c0-6c52-11ef-8c32-f3c2bc7494c6.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 11', description: 'Derek Loccident, dos EUA, na tentativa de conquistar a medalha na prova de salto em distância em sua categoria. No final ele ficou com a prata', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/b1e1/live/0734f050-6c53-11ef-b43e-6916dcba5cbf.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 12', description: 'Yu Qinquan e Yu Deyi da China no meio de uma partida de goalball. Este é um esporte praticado exclusivamente por atletas com deficiência', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/f0ee/live/af1b1dd0-6c53-11ef-b43e-6916dcba5cbf.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 13', description: 'Mauricio Valencia, da Colômbia, em um dos arremessos que lhe garantiram a medalha de prata. Ele é chamado de "O Vampiro" por causa de seus dentes afiados', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/f114/live/08511940-6c54-11ef-8c32-f3c2bc7494c6.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 14', description: 'Bobirjon Omonov do Uzbequistão (centro), Niko Kappel da Alemanha (esquerda) e Jun Huang da China (direita) comemoram seu lugar no pódio na prova de arremesso de peso', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/96b7/live/b45cb810-6c55-11ef-b970-9f202720b57a.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 15', description: 'Ananias Shikongo, da Namíbia, com seu guia na prova dos 100 metros rasos', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/c403/live/38d40120-6c56-11ef-8c32-f3c2bc7494c6.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 16', description: 'Debora e Beatriz Borges Carneiro saúdam a vencedora da medalha de ouro nos 100 metros nado peito, a britânica Louise Fiddes', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/eef3/live/8cf17c10-6c7e-11ef-9078-253b6929b0dd.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 17', description: 'A bocha é um dos dois únicos esportes que não constam da programação olímpica, somente da Paralimpíada', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/8a68/live/baf285c0-6c59-11ef-b970-9f202720b57a.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 18', description: 'Seleção feminina de vôlei sentado dos EUA nas Paraolimpíadas', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/2473/live/e74b4160-6c5a-11ef-b970-9f202720b57a.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 19', description: 'Wojtek Czyz da Nova Zelândia em uma partida de badminton', url: 'https://ichef.bbci.co.uk/ace/ws/787/cpsprodpb/978f/live/69402550-6c5b-11ef-b970-9f202720b57a.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 20', description: 'O chatbot de inteligência artificial chinês DeepSeek-R1 foi lançado discretamente em 20 de janeiro de 2025.', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/ebae/live/79c48e30-dce9-11ef-8610-fb8b116c2235.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 21', description: 'El Salvador retirou do bitcoin o status de moeda legal menos de quatro anos depois de ter sido o primeiro país a adotá-lo', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/c12d/live/550489f0-df60-11ef-988e-1f9f321b7e26.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 22', description: 'Movimento 4B surgiu na Coreia do Sul. Os princípios 4B: sem namoro, sem sexo, sem casamento e sem bebês. ', url: 'https://ichef.bbci.co.uk/ace/ws/799/cpsprodpb/ec29/live/88002d80-d9d1-11ef-a37f-eba91255dc3d.png.webp', user: createdUsers[0]._id },
            { title: 'Imagem 23', description: '"As mulheres artistas que conheço precisam se reconstruir cerca de 20 vezes mais do que os artistas homens, ou estão fora de mercado", afirma Taylor Swift', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/92e6/live/cc2b0500-866e-11ee-913e-f1ed4de8fadb.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 24', description: 'Mesmo com o aumento das temperaturas globais e dos eventos climáticos extremos, o ano de 2024 ainda trouxe avanços silenciosos que favorecem a vida no planeta', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/d894/live/dd8a7ee0-bcad-11ef-aff0-072ce821b6ab.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 25', description: 'O Reino Unido deixou de queimar carvão para a produção de eletricidade em 2024', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/0f97/live/a39ff590-bcb0-11ef-a0f2-fd81ae5962f4.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 26', description: 'O reconhecimento da personalidade jurídica dos animais e dos recursos naturais pode fortalecer a proteção da natureza', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/b0c1/live/a0d9d3e0-bcb4-11ef-a0f2-fd81ae5962f4.jpg.webp', user: createdUsers[0]._id },
            { title: 'Imagem 27', description: 'O antílope saiga foi um dos grandes beneficiados pelos trabalhos de conservação em 2024.', url: 'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/9a62/live/d91630a0-bcb4-11ef-aff0-072ce821b6ab.jpg.webp', user: createdUsers[0]._id },
           
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
