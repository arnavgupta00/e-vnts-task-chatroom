import { Router } from "express";
import chatController from "../controllers/chatController";

const router = Router();

router.get("/rooms", (req, res) => {
  const rooms = chatController.getAvailableRooms();
  res.json({ rooms });
});

export default router;
