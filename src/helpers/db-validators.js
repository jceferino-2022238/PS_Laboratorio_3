import User from '../users/user.model.js';
import Post from '../postsU/post.model.js'
import Comment from '../comments/comments.model.js'
import jwt from "jsonwebtoken"
export const exEmail = async (email = '') =>{
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const exUserById = async (id = '') =>{
    const existsUserById = await User.findById(id);
    if(!existsUserById){
        throw new Error(`Id ${email} doesnt exist`)
    }
}

export const exPostById = async (id = '') =>{
    const existsPostById = await Post.findById(id);
    if(!existsPostById){
        throw new Error(`Id ${title} doesnt exist`)
    }
}

export const exCommentById = async (id = '') =>{
    const existsCommentById = await Comment.findById(id);
    if(!existsCommentById){
        throw new Error(`Id ${title} doesnt exist`)
    }
}

export const isUserAuthorComment = async (id = '') =>{
    const token = req.header('x-token');
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    const comment = await Comment.findById(id)
    if(comment.author !== user._id){
        throw new Error('You are not the author of this comment')
    }
}