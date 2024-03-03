import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name isnt optional']
    },
    email: {
        type: String,
        required: [true, 'Email isnt optional']
    },
    password: {
        type: String,
        required: [true, 'Password isnt optional']
    },
    role: {
        type: String,
        default: "USER_ROLE"
    },
    posts:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    state: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema)