const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["Gate", "Runway", "Baggage Belt"],
            required: true,
        },
        status: {
            type: String,
            enum: ["Available", "Occupied", "Maintenance"],
            default: "Available",
        },
        location: {
            type: String,
            default: "Main Concourse",
        },
    },
    {
        timestamps: true,
    }
);

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
