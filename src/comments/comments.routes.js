import { Router } from "express";
import { check } from "express-validator";
import { commentGet, commentPost, commentsDelete, commentsPut } from "./comments.controller.js";
import { validateFields } from "../middlewares/validateFields.js";
import { exCommentById, exPostById } from "../helpers/db-validators.js";
import { validateJWT } from '../middlewares/validate-jwt.js'
import { isUserRole } from '../middlewares/role-validation.js'
const router = Router();
router.get("/", commentGet)

router.post(
    "/:id",
    [
        validateJWT,
        isUserRole,
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exPostById),
        check("title", "Title isnt optional").not().isEmpty(),
        check("content", "Content isnt optional").not().isEmpty(),
        validateFields
    ], commentPost);

router.put(
    "/:id",
    [
        validateJWT,
        isUserRole,
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exCommentById),
        validateFields
    ], commentsPut);

router.delete(
    "/:id",
    [
        validateJWT,
        isUserRole,
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exCommentById),
        validateFields
    ], commentsDelete);

    export default router;