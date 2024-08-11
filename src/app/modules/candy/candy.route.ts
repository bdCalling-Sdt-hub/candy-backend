import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { candyControllers } from "./candy.controller";
import { candyValidaiton } from "./candy.validation";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.candyGiver),
  validateRequest(candyValidaiton.candySchema),
  candyControllers.insertCandyAddressIntoDb
);
router.get("/", candyControllers.getAllCandyAddress);
router.patch("/:id", candyControllers.updateCandyAddress);
router.patch("/delete/:id", candyControllers.deleteCandyAddress);

export const candyRoutes = router;
