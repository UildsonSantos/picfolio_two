const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Image = require('../models/Image');
const { authMiddleware } = require('../middleware/authMiddleware');
const NodeCache = require('node-cache');
const validator = require('validator');

const router = express.Router();
const cache = new NodeCache({ stdTTL: 60 }); // Cache com tempo de vida de 60 segundos

// @route   POST /images
// @desc    Adicionar uma nova imagem
// @access  Private
router.post(
    '/',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('O título é obrigatório'),
        body('url').isURL().withMessage('A URL da imagem deve ser válida'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, url } = req.body;

        try {
            const newImage = new Image({
                title,
                description,
                url,
                user: req.user.id,
            });

            const savedImage = await newImage.save();
            cache.flushAll(); // Limpa o cache após uma nova inserção
            res.status(201).json(savedImage);
        } catch (err) {
            res.status(500).json({ message: 'Erro ao salvar a imagem', error: err.message });
        }
    }
);

// @route   GET /images
// @desc    Buscar imagens do usuário, com ou sem filtro por título
// @access  Private
router.get('/', authMiddleware, [
    query('url').optional().isURL().withMessage('A URL de busca deve ser válida'),
], async (req, res) => {
    const { title, page = 1, limit = 10, url } = req.query;
    const cacheKey = `images_${req.user.id}_${title}_${page}_${limit}_${url}`;

    // Verifica se há cache para a requisição
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        return res.json(cachedData);
    }

    try {
        const filter = { user: req.user.id };

        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }

        if (url) {
            filter.url = { $regex: url, $options: 'i' };
        }

        // Contar o total de imagens que correspondem ao filtro
        const totalImages = await Image.countDocuments(filter);
        const images = await Image.find(filter)
            .skip((page - 1) * limit)
            .limit(limit);

        // Calcular o total de páginas
        const totalPages = Math.ceil(totalImages / limit);

        // Armazenar no cache
        const response = {
            totalImages,
            totalPages,
            currentPage: page,
            images,
        };
        cache.set(cacheKey, response); // Armazena no cache
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar imagens', error: err.message });
    }
});

module.exports = router;
