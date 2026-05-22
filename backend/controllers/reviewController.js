const {Review} = require('../models');

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllReviews
}