import express from "express";
import { verifyAdmin } from '../utils/verifyToken.js';
import { 
    createRoom, 
    getRoom, 
    getRooms, 
    deleteRoom, 
    updateRoom,
 } from '../controllers/room.js';

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);


export default router