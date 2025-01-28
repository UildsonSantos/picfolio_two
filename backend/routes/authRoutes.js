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

// Rota para login
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

            // Gerar o access token
            const accessToken = jwt.sign(
                { id: usuario._id, email: usuario.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Access token expira em 1 hora
            );

            // Gerar o refresh token
            const refreshToken = jwt.sign(
                { id: usuario._id, email: usuario.email },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '7d' } // Refresh token expira em 7 dias
            );

            // Salvar o refresh token no banco de dados
            usuario.refreshToken = refreshToken;
            await usuario.save();


            res.status(200).json({
                mensagem: 'Login bem-sucedido!',
                accessToken,
                refreshToken,
                nome: usuario.nome,
            });
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao realizar login!', erro });
        }
    });

// Rota para renovar o access token
router.post('/refresh-token',
    async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ mensagem: 'Refresh token não fornecido.' });
        }

        try {
            // Verificar se o refresh token é válido
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            // Verificar se o refresh token está associado ao usuário no banco de dados
            const usuario = await User.findById(decoded.id);
            if (!usuario || usuario.refreshToken !== refreshToken) {
                return res.status(403).json({ mensagem: 'Refresh token inválido.' });
            }

            // Gerar um novo access token
            const accessToken = jwt.sign(
                { id: usuario._id, email: usuario.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ accessToken });
        } catch (erro) {
            res.status(403).json({ mensagem: 'Refresh token inválido ou expirado.' });
        }
    });

// Rota para logout
router.post('/logout',
    async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ mensagem: 'Refresh token não fornecido.' });
        }

        try {
            // Verificar se o refresh token está associado a um usuário
            const usuario = await User.findOne({ refreshToken });
            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }

            // Invalidar o refresh token
            usuario.refreshToken = null;
            await usuario.save();

            res.status(200).json({ mensagem: 'Logout bem-sucedido!' });
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao realizar logout!', erro });
        }
    });
module.exports = router;
