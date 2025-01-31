const jwt = require('jsonwebtoken');
const revokedTokens = new Set(); // Lista negra de tokens revogados

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // Verificar se o token foi revogado
    if (revokedTokens.has(token)) {
        return res.status(403).json({ message: 'Token revogado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Salva as informações do usuário no request
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado.' }); // 401 para token expirado
        } else {
            return res.status(403).json({ message: 'Token inválido.' }); // 403 para outros erros de token
        }
    }
};

// Função para revogar tokens (usada no logout)
const revokeToken = (token) => {
    revokedTokens.add(token);
};

module.exports = { authMiddleware, revokeToken };
