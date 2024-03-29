import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { postGet, postPost, postsDelete, postsPut } from "./post.controller.js";
import { exPostById } from "../helpers/db-validators.js";
import { validateJWT } from '../middlewares/validate-jwt.js'
import { isUserRole } from '../middlewares/role-validation.js'
const router = Router();

router.get("/", postGet);   

router.post(
    "/",
    [
        validateJWT,
        isUserRole,
        check("title", "Title isnt optional").not().isEmpty(),
        check("category", "Category isnt optional").not().isEmpty(),
        check("text", "Text isnt optional").not().isEmpty(),
        validateFields,
    ], postPost)

router.put(
    "/:id",
    [
        validateJWT,
        isUserRole,
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exPostById),
        validateFields
    ], postsPut)

router.delete(
    "/:id",
    [
        validateJWT,
        isUserRole,
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exPostById),
        validateFields
    ], postsDelete)
    
export default router;