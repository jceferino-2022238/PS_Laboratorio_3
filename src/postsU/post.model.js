import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title isnt optional']
    },
    category:{
        type: String,
        required: [true, 'Email isnt optional']
    },
    text:{
        type: String,
        required: [true, 'Post text isnt optional']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comments:{
        type: [mongoose.Schema.Types.ObjectId], 
        required: true,
    },
    state: {
        type: Boolean,
        default: true
    }
})

PostSchema.methods.toJSON= function(){
    const{__v, _id, ...post} = this.toObject();
    post.pid = _id;
    return post;
}

export default mongoose.model('Post', PostSchema)