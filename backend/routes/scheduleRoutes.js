const express = require("express");
const {
    getSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
} = require("../controllers/scheduleController");
const { verifyAdminToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getSchedules);
router.get("/:id", getScheduleById);

// Protected Admin routes
router.post("/", verifyAdminToken, createSchedule);
router.put("/:id", verifyAdminToken, updateSchedule);
router.delete("/:id", verifyAdminToken, deleteSchedule);

module.exports = router;
