'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import postRoutes from '../src/postsU/post.routes.js'
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/ps_laboratorio_3/v1/users';
        this.authPath = '/ps_laboratorio_3/v1/auth';
        this.postPath = '/ps_laboratorio_3/v1/posts'
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.userPath, userRoutes)
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.postPath, postRoutes)
    }

    listen(){
        this.app.listen(this.port,  () =>{
            console.log('Server running on port', this.port)
        })
    }
}

export default Server;
