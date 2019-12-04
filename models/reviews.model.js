const mongoose = require ('mongoose');

const reviewsSchema = new mongoose.Schema ({
    Text: {
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
        ref: 'film',
        required: true
    }

}, {timestamps: true});

const Review = mongoose.model('Review',reviewsSchema);

module.exports = Review;