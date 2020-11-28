const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    public_id: String
}, {
    timestamps: true
});

module.exports = model('post', PostSchema);