import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'The title isnt optional']
    },
    content:{
        type: String,
        required: [true, 'The comment content isnt optional']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    state:{
        type: Boolean,
        default: true
    }
})

CommentSchema.methods.toJSON = function(){
    const{__v, _id, ...comment} = this.toObject();
    comment.cid = _id;
    return comment;
}

export default mongoose.model('Comment', CommentSchema)