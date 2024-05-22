import express from "express";
import {
  createListing,
  deletelisting,
} from "../conrollers/listing.controller.js";
import { verifytoken } from "../utilitis/verifyToken.js"; //but cookie is not stored on browser and i leave it

const router = express.Router();

router.post("/create", createListing);
router.delete("/deletelisting/:id", deletelisting);

export default router;
