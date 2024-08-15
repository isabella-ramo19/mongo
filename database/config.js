const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Connected to mongo DB');
    } catch (error) {
        console.error('Error connecting to mongo DB:', error);
        throw new Error('Database connection failed');
    }

};

module.exports = dbConnection;