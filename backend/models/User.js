const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: 'Por favor, insira um e-mail válido.',
        },
    },
    senha: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: (v) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(v),
            message: 'A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas e números.',
        },
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
