const { Schema, model } = require('mongoose');

const aboutSchema = new Schema({
    title: String,
    description: String,
}, {
    timestamps: true
});

module.exports = model('about', aboutSchema);