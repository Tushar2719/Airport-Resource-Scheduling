const Resource = require("../models/Resource");

// GET /api/resources
const getResources = async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/resources/:id
const getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/resources
const createResource = async (req, res) => {
    try {
        const { name, type, status, location } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Resource name is required." });
        }
        if (!type) {
            return res.status(400).json({ message: "Resource type is required." });
        }

        const resource = await Resource.create({
            name,
            type,
            status: status || "Available",
            location: location || "Main Concourse",
        });

        res.status(201).json({
            message: "Resource created successfully",
            resource,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/resources/:id
const updateResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.json({
            message: "Resource updated successfully",
            resource,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/resources/:id
const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }
        res.json({ message: "Resource deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
};
