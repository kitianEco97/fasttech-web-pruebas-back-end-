const { Router } = require('express');
const router = Router();

const { getAbout, getAboutById, createAbout, updateAbout, deleteAbout } = require('../controllers/about.controller');

router.get('/', getAbout);

router.get('/:id', getAboutById);

router.post('/', createAbout);

router.put('/:id', updateAbout);

router.delete('/delete/:id', deleteAbout)


module.exports = router;