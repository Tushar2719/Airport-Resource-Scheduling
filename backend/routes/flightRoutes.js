const express = require("express");
const {
    getFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight,
    getFlightStats,
} = require("../controllers/flightController");
const { verifyAdminToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", verifyAdminToken, getFlightStats);

// Public routes
router.get("/", getFlights);
router.get("/:id", getFlightById);

// Protected Admin routes
router.post("/", verifyAdminToken, createFlight);
router.put("/:id", verifyAdminToken, updateFlight);
router.delete("/:id", verifyAdminToken, deleteFlight);

module.exports = router;
