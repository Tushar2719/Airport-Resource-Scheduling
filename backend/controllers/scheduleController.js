const Schedule = require("../models/Schedule");

// GET /api/schedules
const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().sort({ startTime: 1 });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/schedules/:id
const getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule allocation not found." });
        }
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/schedules
const createSchedule = async (req, res) => {
    try {
        const { flightNumber, airline, resource, startTime, endTime, status } = req.body;

        if (!flightNumber || !resource || !startTime || !endTime) {
            return res.status(400).json({ message: "Flight number, resource, start time, and end time are required." });
        }

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: "Invalid date format for start or end time." });
        }

        if (start >= end) {
            return res.status(400).json({ message: "End time must be after start time." });
        }

        // Conflict check: Check if same resource is assigned during an overlapping time
        const conflict = await Schedule.findOne({
            resource: resource,
            startTime: { $lt: end },
            endTime: { $gt: start },
        });

        if (conflict) {
            return res.status(400).json({
                message: `Scheduling Conflict: ${resource} is already assigned during this time.`,
            });
        }

        const schedule = await Schedule.create({
            flightNumber,
            airline: airline || "",
            resource,
            startTime: start,
            endTime: end,
            status: status || "Scheduled",
        });

        res.status(201).json({
            message: "Schedule created successfully.",
            schedule,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/schedules/:id
const updateSchedule = async (req, res) => {
    try {
        const { flightNumber, airline, resource, startTime, endTime, status } = req.body;
        const scheduleId = req.params.id;

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: "Invalid date format for start or end time." });
        }

        if (start >= end) {
            return res.status(400).json({ message: "End time must be after start time." });
        }

        // Conflict check excluding current schedule
        const conflict = await Schedule.findOne({
            _id: { $ne: scheduleId },
            resource: resource,
            startTime: { $lt: end },
            endTime: { $gt: start },
        });

        if (conflict) {
            return res.status(400).json({
                message: `Scheduling Conflict: ${resource} is already assigned during this time.`,
            });
        }

        const schedule = await Schedule.findByIdAndUpdate(
            scheduleId,
            { flightNumber, airline, resource, startTime: start, endTime: end, status },
            { new: true, runValidators: true }
        );

        if (!schedule) {
            return res.status(404).json({ message: "Schedule allocation not found." });
        }

        res.json({
            message: "Schedule updated successfully.",
            schedule,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/schedules/:id
const deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule allocation not found." });
        }
        res.json({ message: "Schedule deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
};
