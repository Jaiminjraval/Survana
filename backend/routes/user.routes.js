import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  upgradeToPremium,
  cancelPremium,
} from "../controllers/user.controller.js"; 

const router = express.Router();

router.post("/upgrade", protectRoute, upgradeToPremium);
router.post("/cancel-premium", protectRoute, cancelPremium);

export default router;
