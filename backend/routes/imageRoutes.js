const express = require('express');
const { body, validationResult } = require('express-validator');
const Image = require('../models/Image');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

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
            res.status(201).json(savedImage);
        } catch (err) {
            res.status(500).json({ message: 'Erro ao salvar a imagem', error: err.message });
        }
    }
);

// @route   GET /images
// @desc    Buscar imagens do usuário, com ou sem filtro por título
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    const { title } = req.query;

    try {
        const filter = { user: req.user.id };

        // Se o parâmetro "title" existir, adiciona o filtro de busca por título
        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }

        const images = await Image.find(filter);
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar imagens', error: err.message });
    }
});

module.exports = router;
