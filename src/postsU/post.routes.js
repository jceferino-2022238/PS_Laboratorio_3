import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { postGet, postPost, postsDelete, postsPut } from "./post.controller.js";
import { exPostById } from "../helpers/db-validators.js";

const router = Router();

router.get("/", postGet);   

router.post(
    "/:id",
    [
        check("title", "Title isnt optional").not().isEmpty(),
        check("category", "Category isnt optional").not().isEmpty(),
        check("text", "Text isnt optional").not().isEmpty(),
        validateFields,
    ], postPost)

router.put(
    "/:id",
    [
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exPostById),
        validateFields
    ], postsPut)

router.delete(
    "/:id",
    [
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exPostById),
        validateFields
    ], postsDelete)
    
export default router;