const Flight = require("../models/Flight");

// GET /api/flights
const getFlights = async (req, res) => {
    try {
        const flights = await Flight.find().sort({ createdAt: -1 });
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/flights/:id
const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found." });
        }
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/flights
const createFlight = async (req, res) => {
    try {
        const { flightNumber, airline, source, origin, destination, scheduledTime, estimatedTime, terminal, gate, status, type } = req.body;

        if (!flightNumber) {
            return res.status(400).json({ message: "Flight number is required." });
        }
        if (!airline) {
            return res.status(400).json({ message: "Airline is required." });
        }

        const flightSource = source || origin;
        if (!flightSource) {
            return res.status(400).json({ message: "Flight origin / source is required." });
        }
        if (!destination) {
            return res.status(400).json({ message: "Destination is required." });
        }

        const flightData = {
            flightNumber,
            airline,
            source: flightSource,
            destination,
            scheduledTime: scheduledTime || "12:00 PM",
            estimatedTime: estimatedTime || "",
            terminal: terminal || "Terminal 1",
            gate: gate || "Gate A01",
            status: status || "Scheduled",
            type: type || "Arrival",
        };

        const flight = await Flight.create(flightData);
        res.status(201).json({
            message: "Flight created successfully",
            flight,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/flights/:id
const updateFlight = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.origin && !updateData.source) {
            updateData.source = updateData.origin;
        }

        const flight = await Flight.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!flight) {
            return res.status(404).json({ message: "Flight not found." });
        }

        res.json({
            message: "Flight updated successfully",
            flight,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/flights/:id
const deleteFlight = async (req, res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found." });
        }
        res.json({ message: "Flight deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight,
};