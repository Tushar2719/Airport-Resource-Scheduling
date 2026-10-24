const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    airline: {
      type: String,
      required: true,
      trim: true,
    },
    aircraftType: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["Arrival", "Departure"],
      default: "Arrival",
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    scheduledTime: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: String,
      default: "",
    },
    terminal: {
      type: String,
      default: "Terminal 1",
    },
    gate: {
      type: String,
      default: "Gate A01",
    },
    status: {
      type: String,
      enum: [
        "On Time",
        "Boarding",
        "Delayed",
        "Departed",
        "Arrived",
        "Cancelled",
        "Scheduled",
      ],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  },
);

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
