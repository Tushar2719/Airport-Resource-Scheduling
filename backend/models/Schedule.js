const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: true,
            trim: true,
        },
        airline: {
            type: String,
            default: "",
        },
        resource: {
            type: String,
            required: true,
            trim: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Scheduled", "Active", "Completed", "Cancelled"],
            default: "Scheduled",
        },
    },
    {
        timestamps: true,
    }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
