import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getSimilarArtists } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/similar', protectRoute, getSimilarArtists);

export default router;
