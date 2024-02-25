import express, { Router } from "express";
import { asyncHandler } from "node-async-handler";
import { home, post } from "./middlewares";

export const router: Router = express.Router();

router.get("/", asyncHandler(home));
router.get("/posts/:id", asyncHandler(post));
