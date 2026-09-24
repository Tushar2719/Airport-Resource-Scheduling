const express = require("express");
const {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
} = require("../controllers/resourceController");
const { verifyAdminToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getResources);
router.get("/:id", getResourceById);

// Protected Admin routes
router.post("/", verifyAdminToken, createResource);
router.put("/:id", verifyAdminToken, updateResource);
router.delete("/:id", verifyAdminToken, deleteResource);

module.exports = router;
