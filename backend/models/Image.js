const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100, // Limite de caracteres para o título
    },
    description: {
        type: String,
        maxlength: 500, // Limite de caracteres para a descrição
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v), // Validação de URL
            message: 'A URL da imagem deve ser válida.',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Image', imageSchema);
