const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares - se ejecutan antes de llegar a las rutas
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({ storage }).single('image'));

// routes
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/about', require('./routes/about.routes'));

module.exports = app;