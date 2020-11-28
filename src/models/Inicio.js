import { Schema, model } from 'mongoose';

const InicioSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    public_id: String
}, {
    timestamps: true
});

module.exports = model('inicio', InicioSchema)