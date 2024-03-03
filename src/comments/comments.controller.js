import { response, request} from 'express';
import Comment from './comments.model.js'
import User from '../users/user.model.js';
import Post from '../postsU/post.model.js';
import jwt from "jsonwebtoken";

export const commentGet = async (req=request, res = response) =>{
    const {limit, from} = req.query;
    const query = {state: true};
    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        comments
    })
}

export const commentPost = async (req, res) =>{
    const { id } = req.params;
    const { title, content} = req.body;
    const token = req.header('x-token');
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        const post = await Post.findById(id);

        const comment = new Comment({title, content, author: user._id, post: id})

        await comment.save();

        post.comments.push(comment._id);

        await post.save();

        res.status(200).json({
            msg: 'New Comment',
            user: user.email
        })
    } catch (e) {
        res.status(500).json({e: 'Comment couldnt be added'})
    }
}

export const commentsPut = async(req, res = response) =>{
    const { id } = req.params;
    const {_id, ...rest} = req.body;
    const token = req.header('x-token');
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    const comment = await Comment.findOne({_id: id})
    if(comment.author.toString() !== user._id.toString()){
        throw new Error('You are not the author of this comment')
    }

    await Comment.findByIdAndUpdate(id, rest);
    
    res.status(200).json({
        msg: "Comment updated",
        comment
    })
}

export const commentsDelete = async(req, res) =>{
    const { id } = req.params;

    const token = req.header('x-token');
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    const comment = await Comment.findOne({_id: id})
    if(comment.author.toString() !== user._id.toString()){
        throw new Error('You are not the author of this comment')
    }

    const commentD = await Comment.findByIdAndUpdate(id, {state: false});
    await Post.updateMany({comments: id}, {$pull: {comments: id}});
    res.status(200).json({
        msg: "Comment deleted",
        commentD
    })
}