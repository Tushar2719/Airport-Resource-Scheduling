const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Flight = require("./models/Flight");
const Resource = require("./models/Resource");
const Schedule = require("./models/Schedule");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aerovista";

const sampleFlights = [
    {
        flightNumber: "EK201",
        airline: "Emirates",
        type: "Arrival",
        source: "Dubai (DXB)",
        destination: "AeroVista (AVX)",
        scheduledTime: "08:15 AM",
        estimatedTime: "08:10 AM",
        terminal: "Terminal 3",
        gate: "Gate A01",
        status: "Arrived",
    },
    {
        flightNumber: "BA117",
        airline: "British Airways",
        type: "Arrival",
        source: "London (LHR)",
        destination: "AeroVista (AVX)",
        scheduledTime: "09:45 AM",
        estimatedTime: "10:05 AM",
        terminal: "Terminal 3",
        gate: "Gate A02",
        status: "Delayed",
    },
    {
        flightNumber: "SQ322",
        airline: "Singapore Airlines",
        type: "Arrival",
        source: "Singapore (SIN)",
        destination: "AeroVista (AVX)",
        scheduledTime: "10:30 AM",
        estimatedTime: "10:30 AM",
        terminal: "Terminal 2",
        gate: "Gate B01",
        status: "On Time",
    },
    {
        flightNumber: "AI101",
        airline: "Air India",
        type: "Departure",
        source: "AeroVista (AVX)",
        destination: "New Delhi (DEL)",
        scheduledTime: "11:15 AM",
        estimatedTime: "11:15 AM",
        terminal: "Terminal 1",
        gate: "Gate A01",
        status: "Boarding",
    },
    {
        flightNumber: "LH454",
        airline: "Lufthansa",
        type: "Departure",
        source: "AeroVista (AVX)",
        destination: "Frankfurt (FRA)",
        scheduledTime: "12:00 PM",
        estimatedTime: "12:00 PM",
        terminal: "Terminal 3",
        gate: "Gate A02",
        status: "On Time",
    },
    {
        flightNumber: "6E202",
        airline: "IndiGo",
        type: "Departure",
        source: "AeroVista (AVX)",
        destination: "Mumbai (BOM)",
        scheduledTime: "01:45 PM",
        estimatedTime: "01:45 PM",
        terminal: "Terminal 1",
        gate: "Gate B01",
        status: "Scheduled",
    },
];

const sampleResources = [
    {
        name: "Gate A01",
        type: "Gate",
        status: "Occupied",
        location: "Terminal 3 - Concourse A",
    },
    {
        name: "Gate A02",
        type: "Gate",
        status: "Available",
        location: "Terminal 3 - Concourse A",
    },
    {
        name: "Gate B01",
        type: "Gate",
        status: "Available",
        location: "Terminal 2 - Concourse B",
    },
    {
        name: "Runway 09/27",
        type: "Runway",
        status: "Available",
        location: "North Airfield",
    },
    {
        name: "Runway 18/36",
        type: "Runway",
        status: "Available",
        location: "South Airfield",
    },
];

const sampleSchedules = [
    {
        flightNumber: "AI101",
        airline: "Air India",
        resource: "Gate A01",
        startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
        endTime: new Date(Date.now() + 30 * 60 * 1000),   // 30 mins from now
        status: "Active",
    },
    {
        flightNumber: "LH454",
        airline: "Lufthansa",
        resource: "Gate A02",
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
        status: "Scheduled",
    },
    {
        flightNumber: "SQ322",
        airline: "Singapore Airlines",
        resource: "Gate B01",
        startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
        status: "Scheduled",
    },
];

async function seedData() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing collections
        await User.deleteMany({});
        await Flight.deleteMany({});
        await Resource.deleteMany({});
        await Schedule.deleteMany({});

        // Create Admin User
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const adminUser = await User.create({
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin",
        });
        console.log(`Created admin user: ${adminUser.email}`);

        // Insert Flights
        const createdFlights = await Flight.insertMany(sampleFlights);
        console.log(`Inserted ${createdFlights.length} flights`);

        // Insert Resources
        const createdResources = await Resource.insertMany(sampleResources);
        console.log(`Inserted ${createdResources.length} resources`);

        // Insert Schedules
        const createdSchedules = await Schedule.insertMany(sampleSchedules);
        console.log(`Inserted ${createdSchedules.length} schedules`);

        console.log("Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seedData();
