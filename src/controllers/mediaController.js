import { Router } from "express";
import MediaService from "./../services/mediaService.js"

const router = Router();
const mediaService = new MediaService();

export default router;
