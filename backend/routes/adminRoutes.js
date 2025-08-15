import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { listRestaurants, approveRestaurant, disableRestaurant, listOrders, listUsers, banUser } from "../controllers/adminController.js";

const router = Router();
router.use(protect, allowRoles("admin"));

router.get("/restaurants", listRestaurants);
router.patch("/restaurants/:id/approve", approveRestaurant);
router.patch("/restaurants/:id/disable", disableRestaurant);

router.get("/orders", listOrders);
router.get("/users", listUsers);
router.patch("/users/:id/ban", banUser);

export default router;
