import { Router } from "express";
import { check } from "express-validator";
import { usersGet, usersPost, usersPut } from "./user.controller.js";
import { exEmail, exUserById} from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.get("/", usersGet);

router.post(
    "/",
    [
        check("name", "Name isnt optional").not().isEmpty(),
        check("password", "Password cant be shorter than 6 characters").isLength({ min: 6}),
        check("email", "This is not a valid Email").isEmail(),
        check("email").custom(exEmail),
        validateFields,
    ], usersPost);

router.put(
    "/:id",
    [
        check("id", "Not valid ID").isMongoId(),
        check("id").custom(exUserById),
        validateFields
    ], usersPut);

export default router;