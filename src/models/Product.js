const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    public_id: String
}, {
    timestamps: true
});

module.exports = model('product', ProductSchema);