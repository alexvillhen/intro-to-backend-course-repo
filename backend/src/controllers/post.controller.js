import {Post} from '../models/post.model.js'

//CREATE A POST
const createPost = async (req, res) => {
    try {
        const {name, description, age} = req.body;

        if(!name || !description || !age){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const post = await Post.create({name, description, age})

        res.status(201).json({
            message: "Post created successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal sever error",
            error: error.message
        })
    }
}

const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            message: "Posts fetched successfully",
            posts
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const getPostById = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findOne({
            _id: id
        });

        if(!post){
            return res.status(404).json({
                message: "No post under specified ID found"
            })
        }

        res.status(200).json({
            message: "Post fetched successfully",
            post
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const editPost = async(req, res) => {
    try {
        const {name, description, age} = req.body;
        const {id} = req.params;

        const updates = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (age !== undefined) updates.age = age;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "At least one field is required to update"
            })
        }

        const post = await Post.findByIdAndUpdate(
            id,
            updates,
            {new: true, runValidators: true}
        );

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            })
        }

        res.status(200).json({
            message: "Post updated successfully",
            post
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export {
    createPost,
    getAllPosts,
    getPostById,
    editPost
};