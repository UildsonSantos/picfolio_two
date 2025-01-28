const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10, // Configura o tamanho do pool de conexões
        });
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Erro ao conectar ao MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
