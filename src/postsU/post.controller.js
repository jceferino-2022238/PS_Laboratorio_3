import { response, request} from 'express';
import Post from './post.model.js'
import User from '../users/user.model.js'
import jwt from "jsonwebtoken"

export const postGet = async (req = request, res = response) =>{
    const {limit, from} = req.query;
    const query = {state: true};

    const [total, posts] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        posts
    })
}
export const postPost = async (req, res) =>{
    const { title, category, text} = req.body;
    const token = req.header('x-token');
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        
        const post = new Post({title, category, text, author: user._id});
        await post.save();
        user.posts.push(post._id);
        await user.save();  
        res.status(200).json({
            msg: 'New Post',
            user: user.email
        })
    } catch (e) {
        res.status(500).json({e: 'Post couldnt be added'})
    }
};

export const postsPut = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, ...rest} = req.body;
    await Post.findByIdAndUpdate(id, rest);

    const post = await Post.findOne({_id: id});
    res.status(200).json({
        msg: "Post updated",
        post
    })
}

export const postsDelete = async (req, res) =>{
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, {state: false});
    await User.updateMany({ posts: id}, {$pull: {posts: id}});
    res.status(200).json({
        msg: "Post deleted",
        post
    })
}

