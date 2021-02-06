import express from "express";
import Protect from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { makePaymentWithStripe } from "../controllers/stripePaymentController.js";

const router = express.Router();

router.route("/").post(Protect, addOrderItems);
router.route("/myorders").get(Protect, getMyOrders);
router.route("/:id").get(Protect, getOrderById);
router.route("/:id/payment").put(Protect, updateOrderToPaid);
router.route("/stripePayment").post(Protect, makePaymentWithStripe);

export default router;
