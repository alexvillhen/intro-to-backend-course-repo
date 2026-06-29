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


export {
    createPost
};