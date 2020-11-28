const { response } = require('express');
const { findById } = require('../models/About');

const About = require('../models/About');

const getAbout = async(req, res = response) => {

    const abouts = await About.find();
    res.json(abouts);

}

const getAboutById = async(req, res = response) => {
    const { id } = req.params;
    const byId = await About.findById(id);
    res.json(byId);
}

const createAbout = async(req, res = response) => {
    const { title, description } = req.body;
    const newAbout = new About({
        title,
        description
    });
    await newAbout.save();
    res.json({
        ok: true,
        msg: 'creating a new about',
        newAbout
    });
}

const updateAbout = async(req, res = response) => {

    const id = req.params.id;

    try {
        const about = await About.findById(id);

        if (!about) {
            return res.status(404).json({
                ok: true,
                msg: 'can not find the aboutById'
            });
        }

        const cambiosAbout = {
            ...req.body
        }

        const aboutActualizado = await About.findByIdAndUpdate(id, cambiosAbout, { new: true });

        res.json({
            ok: true,
            about: aboutActualizado
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'problems to update the about, talk with the admin'
        });

    }

}

const deleteAbout = async(req, res = response) => {

    const id = req.params.id;

    try {

        const about = await About.findById(id);
        if (!about) {
            return res.status(501).json({
                ok: true,
                msg: 'about dont find in the DB'
            });
        }

        await About.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'About deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk with the admin'
        });
    }


}

module.exports = {
    getAbout,
    getAboutById,
    createAbout,
    updateAbout,
    deleteAbout
}