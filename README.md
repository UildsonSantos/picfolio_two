
# **PicFólio**


**PicFólio** é uma aplicação web fullstack que permite aos usuários explorar, buscar e adicionar imagens em uma galeria inspirada no Instagram. Desenvolvida com React.js no frontend, Express.js no backend e MongoDB como banco de dados, a aplicação oferece uma experiência de usuário moderna e segura.

---

## **Funcionalidades Principais**

- **Login e Autenticação**:
  - Os usuários podem fazer login para acessar funcionalidades exclusivas.
  - Autenticação segura com JWT (JSON Web Tokens) e refresh tokens.

- **Busca de Imagens**:
  - Os usuários podem buscar imagens por título.
  - Resultados de busca paginados para melhor desempenho.

- **Inserção de Imagens**:
  - Usuários autenticados podem adicionar novas imagens à galeria.
  - Validação de campos e sanitização de entradas para prevenir ataques XSS e NoSQL injection.

- **Dashboard Pessoal**:
  - Cada usuário tem um dashboard onde pode visualizar suas próprias imagens.

- **Segurança**:
  - Uso de HTTPS para proteger as credenciais durante a transmissão.
  - Sanitização de entradas e prevenção de ataques de SQL/NoSQL inject e XSS.
  - Prevenção de ataques automatizados com rate limiting.
  - Registro e monitoramento de erros de autenticação, buscas e inserções em logs.
  - Armazenamento seguro de senhas com criptografia (bcrypt).
  - Invalidação correta de tokens de autenticação após o logout.

---

## **Tecnologias Utilizadas**

### **Frontend**
- **React.js**: Biblioteca JavaScript para construção da interface do usuário.
- **React Router**: Gerenciamento de rotas para uma experiência SPA (Single Page Application).
- **Axios**: Cliente HTTP para fazer requisições ao backend.
- **DOMPurify**: Biblioteca para sanitização de entradas e prevenção de XSS.
- **Swiper**: Biblioteca para o carrossel de imagens.
- **CSS**: Estilização customizada para design responsivo.

### **Backend**
- **Express.js**: Framework Node.js para construção da API RESTful.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: Biblioteca para modelagem de dados e interação com o MongoDB.
- **JWT (JSON Web Tokens)**: Autenticação segura com tokens de acesso e refresh tokens.
- **Bcrypt**: Criptografia de senhas para armazenamento seguro.
- **Helmet**: Middleware para configurar cabeçalhos HTTPS seguros.
- **Express Rate Limit**: Prevenção de ataques de força bruta com rate limiting.
- **Express Mongo Sanitize**: Prevenção de NoSQL injection.
- **XSS Clean**: Prevenção de ataques XSS.
- **Compression**: Compressão de respostas do servidor.
- **Morgan**: Registrar Logs de requisições
- **NodeCache**: Implementação de cache no Back-end

### **Outras Ferramentas**
- **Node.js**: Ambiente de execução JavaScript no backend.
- **NPM**: Gerenciador de pacotes para instalação de dependências.
- **Git**: Controle de versão do projeto.

---

## **Como Executar o Projeto**

### **Pré-requisitos**
- Node.js (v16 ou superior)
- MongoDB (local ou Atlas)
- NPM ou Yarn

### **Passos para Execução**

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/picfolio.git
   cd picfolio
   ```

2. **Instale as dependências**:
   - No diretório `backend`:
     ```bash
     cd backend
     npm install
     ```
   - No diretório `frontend`:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Configure o ambiente**:
   - Renomeie o arquivo `.env.exemplo` para `.env` no diretório `backend` e adicione valores as variaveis necessárias
     ```plaintext         
        PORT=5000
        MONGO_URI=mongodb://<usuario>:<senha>@localhost:27017/<nome_do_banco>
        JWT_SECRET=sua_chave_secreta_aqui
        JWT_REFRESH_SECRET=sua_chave_secreta_refresh_aqui

        # Em modo de desenvolvimento use um certificado autoassinado
        # Use o OpenSSL para gerar um certificado e uma chave privada e substitua o path abaixo
        # openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
        PRIVATE_KEY_PATH='path_da_key_do_certificado_SSL/TLS_autoassinado'
        CERTIFICATE_PATH='path_do_certificado_SSL/TLS_autoassinado'
     ```

4. **Inicie o MongoDB**:
   - Certifique-se de que o MongoDB está em execução. Se estiver usando localmente, inicie o servidor MongoDB com o comando:
     ```bash
     mongosh
     ```
   - Se estiver usando o MongoDB Atlas, atualize a `MONGO_URI` no arquivo `.env` com a string de conexão fornecida.

5. **Popule o banco de dados com dados de teste**:
   - Execute o arquivo `seed.js` para adicionar usuários e imagens de teste ao banco de dados:
     ```bash
     cd backend
     node seed.js
     ```

6. **Inicie o servidor backend**:
   ```bash
   npm start
   ```

7. **Inicie o servidor frontend**:
   ```bash
   cd ../frontend
   npm start
   ```

8. **Acesse a aplicação**:
   - Abra o navegador e acesse `https://localhost:3000`.

---

## **Estrutura do Projeto**

### **Backend**
- **`/config`**: Configurações do banco de dados e autenticação.
- **`/models`**: Modelos de dados (usuários e imagens).
- **`/routes`**: Rotas da API (autenticação e imagens).
- **`/middleware`**: Middlewares de autenticação e segurança.
- **`/server.js`**: Lógica de negócio para as rotas.
- **`seed.js`**: Script para popular o banco de dados com dados de teste.

### **Frontend**
- **`/src/components`**: Componentes React (Home, HomeContent, Login, Dashboard, etc.).
- **`/src/context`**: Contexto de autenticação.
- **`/src/authService`**: Funções para gerenciar tokens e autenticação.
- **`/src/axiosConfig`**: Configuração do Axios para requisições HTTP.

---

## **Requisitos de Segurança Implementados**

O projeto atende aos seguintes requisitos de segurança:

1. **Falhas de Criptografia**:
   - Uso de HTTPS para proteger as credenciais durante a transmissão.
   - Armazenamento seguro de senhas com criptografia (bcrypt).

2. **Injeção**:
   - Prevenção de NoSQL injection com `express-mongo-sanitize`.
   - Prevenção de XSS com `xss-clean` e sanitização de entradas no frontend.

3. **Falhas de Identificação e Autenticação**:
   - Prevenção de ataques automatizados com rate limiting (`express-rate-limit`).
   - Invalidação correta de tokens de autenticação após o logout.

4. **Falhas de Registro e Monitoramento de Segurança**:
   - Registro de erros de autenticação, buscas e inserções em logs.
   - Uso de logs para monitoramento de atividades suspeitas.

---

## **Contribuição**

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## **Licença**

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

