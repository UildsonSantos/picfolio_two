const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Rota para login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verificar se o usuário existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        // Verificar a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas!' });
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ mensagem: 'Login bem-sucedido!', token, nome: usuario.nome });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao realizar login!', erro });
    }
});

module.exports = router;
