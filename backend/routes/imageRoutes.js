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
// @desc    Buscar todas as imagens
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const images = await Image.find({ user: req.user.id });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar imagens', error: err.message });
    }
});

// @route   GET /images
// @desc    Buscar imagens por título (case insensitive)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ error: 'O parâmetro de busca "title" é obrigatório.' });
        }

        const images = await Image.find({ title: { $regex: title, $options: 'i' } }); // Busca por título contendo o termo
        res.status(200).json({ results: images });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar imagens.' });
    }
});

module.exports = router;
