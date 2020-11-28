const { response } = require('express');

const Post = require('../models/Post');

const fs = require('fs-extra');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getPosts = async(req, res = response) => {

    const posts = await Post.find();

    res.json(posts);

}

const getPost = async(req, res = response) => {

    const id = req.params.id;

    try {

        const post = await Post.findById(id);

        res.json({
            ok: true,
            post
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'problems to get the post by id'
        })
    }

}

const createPost = async(req, res) => {

    const { title, description } = req.body;
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newPost = new Post({
            title,
            description,
            imageUrl: result.url,
            public_id: result.public_id
        });
        await newPost.save();
        res.status(200).json({
            msg: 'succefull upload',
            newPost
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'problems to create a new post'
        });
    }
}

const updatePost = async(req, res = response) => {
    const id = req.params.id;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                ok: true,
                msg: 'can not find the postById'
            });
        }

        const cambiosPost = {
            ...req.body
        }

        const postActualizado = await Post.findByIdAndUpdate(id, cambiosPost, { new: true });

        res.json({
            ok: true,
            post: postActualizado
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'problems to update the post, talk with the admin'
        });

    }
}

const deletePost = async(req, res) => {

    const { photo_id } = req.params;

    try {

        await fs.unlink(req.file.path);
        const photo = await Post.findByIdAndDelete(photo_id);
        const result = await cloudinary.uploader.destroy(photo.public_id);

        res.status(200).json({
            ok: true,
            msg: 'post deleted succefully',
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'problems to delete the post'
        });
    }


}



module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}