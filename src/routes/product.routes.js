const { Router } = require('express');
const router = Router();

const Products = require('../models/Product');

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/upload', createProduct);

router.put('/update/:id', updateProduct);

router.get('/delete/:photo_id', deleteProduct);

module.exports = router;