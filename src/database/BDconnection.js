const mongoose = require('mongoose');
require('dotenv').config(); // dotenv package ko load karein

const DATABASE_URL= process.env.DATABASE_URL; // .env file se URL lein

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL
        //   { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = {connectDB};

