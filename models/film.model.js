const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Film = mongoose.model('Film',filmSchema);

module.exports = Film;