const mongoose = require ('mongoose');

const reviewsSchema = new mongoose.Schema ({
    text: {
        type: String
    },
    rating: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    }

}, {timestamps: true});

const Review = mongoose.model('Review',reviewsSchema);

module.exports = Review;