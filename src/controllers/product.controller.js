const { response } = require('express');

const Product = require('../models/Product');

const fs = require('fs-extra');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const getProducts = async(req, res) => {
    const products = await Product.find();
    res.json(products);
}

const getProductById = async(req, res = response) => {

    const { id } = req.params;
    const product = await Product.findById(id);
    return res.json(product);

}

const createProduct = async(req, res = response) => {

    const { title, description } = req.body;
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newProduct = new Product({
            title,
            description,
            imageUrl: result.url,
            public_id: result.public_id
        });
        await newProduct.save();
        res.status(200).json({
            msg: 'product succefull upload',
            newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'problems to create a new product'
        });
    }

}

const updateProduct = async(req, res = response) => {

    const id = req.params.id;

    try {
        const producto = await Product.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: true,
                msg: 'can not find the productById'
            });
        }

        const cambiosProducto = {
            ...req.body
        }

        const productoActualizado = await Product.findByIdAndUpdate(id, cambiosProducto, { new: true });

        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'problems to update the product, talk with the admin'
        });

    }

}

const deleteProduct = async(req, res = response) => {

    const { photo_id } = req.params;

    try {

        await fs.unlink(req.file.path);
        const photo = await Product.findByIdAndDelete(photo_id);
        const result = await cloudinary.uploader.destroy(photo.public_id);

        res.status(200).json({
            ok: true,
            msg: 'product deleted succefully',
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'problems to delete the product'
        });
    }

}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}