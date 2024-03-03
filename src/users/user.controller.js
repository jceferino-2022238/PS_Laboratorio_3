    import { response, request } from "express";
    import bcryptjs from 'bcryptjs';
    import User from './user.model.js'


    
    export const usersGet = async (req = request, res = response) =>{
        const { limit, from} = req.query;
        const query = {state: true};
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
        ]);

        res.status(200).json({
            total,
            users
        })
    }

    export const usersPost = async (req, res) =>{
        const {name, email, password} = req.body;
        const user = new User({name, email, password});

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            user
        })
    }
    export const usersPut = async (req, res = response) =>{
        const { id } = req.params;
        const {_id, ...rest} = req.body;
        const lastPassword = req.body.lastPassword;
        const user = await User.findOne({_id: id})
        const actualPassword = user.password
        const match = await bcryptjs.compare(lastPassword, actualPassword);
        if(!match){
            throw new Error('The password sent wasnt user last password')
        }
        if(match){
            rest.password = await bcryptjs.hash(rest.password, 10)
            await User.findByIdAndUpdate(id, {...rest, password: rest.password || user.password});

            res.status(200).json({
                msg: "User updated",
                user
            })
        }
    }