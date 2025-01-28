const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Limitar tentativas de login (5 tentativas por 15 minutos)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 tentativas
    message: 'Muitas tentativas de login. Tente novamente mais tarde.',
});

router.post('/login',
    loginLimiter, // Aplica o limite de tentativas
    [
        check('email', 'Por favor, insira um e-mail válido').isEmail().normalizeEmail(),
        check('senha', 'A senha é obrigatória').notEmpty().trim().escape(),
    ],
    async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        const { email, senha } = req.body;

        try {
            const usuario = await User.findOne({ email });
            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ mensagem: 'Credenciais inválidas!' });
            }

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
