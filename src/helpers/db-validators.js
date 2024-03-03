import User from '../users/user.model.js';
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