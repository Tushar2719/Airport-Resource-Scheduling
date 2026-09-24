// Central data store for AeroVista International Airport

const INITIAL_FLIGHTS = [
  {
    id: 'fl-101',
    flightNumber: 'EK-201',
    airline: 'Emirates',
    type: 'Arrival',
    source: 'Dubai (DXB)',
    destination: 'AeroVista (AVX)',
    scheduledTime: '08:15 AM',
    estimatedTime: '08:10 AM',
    departureTime: '2026-09-11T04:00',
    arrivalTime: '2026-09-11T08:15',
    terminal: 'Terminal 3',
    gate: 'Gate A01',
    runway: 'Runway 09R/27L',
    status: 'Arrived',
    baggageBelt: 'Belt 04',
    aircraft: 'Boeing 777-300ER',
  },
  {
    id: 'fl-102',
    flightNumber: 'BA-117',
    airline: 'British Airways',
    type: 'Arrival',
    source: 'London Heathrow (LHR)',
    destination: 'AeroVista (AVX)',
    scheduledTime: '09:45 AM',
    estimatedTime: '10:05 AM',
    departureTime: '2026-09-11T02:15',
    arrivalTime: '2026-09-11T09:45',
    terminal: 'Terminal 3',
    gate: 'Gate A04',
    runway: 'Runway 09R/27L',
    status: 'Delayed',
    baggageBelt: 'Belt 02',
    aircraft: 'Airbus A350-1000',
  },
  {
    id: 'fl-103',
    flightNumber: 'SQ-322',
    airline: 'Singapore Airlines',
    type: 'Arrival',
    source: 'Singapore Changi (SIN)',
    destination: 'AeroVista (AVX)',
    scheduledTime: '10:30 AM',
    estimatedTime: '10:30 AM',
    departureTime: '2026-09-11T03:30',
    arrivalTime: '2026-09-11T10:30',
    terminal: 'Terminal 2',
    gate: 'Gate B02',
    runway: 'Runway 09L/27R',
    status: 'On Time',
    baggageBelt: 'Belt 01',
    aircraft: 'Boeing 787-10',
  },
  {
    id: 'fl-104',
    flightNumber: 'DL-088',
    airline: 'Delta Air Lines',
    type: 'Departure',
    source: 'AeroVista (AVX)',
    destination: 'Atlanta (ATL)',
    scheduledTime: '11:15 AM',
    estimatedTime: '11:15 AM',
    departureTime: '2026-09-11T11:15',
    arrivalTime: '2026-09-11T20:00',
    terminal: 'Terminal 1',
    gate: 'Gate C12',
    runway: 'Runway 14/32',
    status: 'Boarding',
    baggageBelt: 'N/A',
    aircraft: 'Airbus A330-900neo',
  },
  {
    id: 'fl-105',
    flightNumber: 'LH-454',
    airline: 'Lufthansa',
    type: 'Departure',
    source: 'AeroVista (AVX)',
    destination: 'Frankfurt (FRA)',
    scheduledTime: '12:00 PM',
    estimatedTime: '12:00 PM',
    departureTime: '2026-09-11T12:00',
    arrivalTime: '2026-09-11T18:45',
    terminal: 'Terminal 3',
    gate: 'Gate A08',
    runway: 'Runway 09R/27L',
    status: 'On Time',
    baggageBelt: 'N/A',
    aircraft: 'Boeing 747-8i',
  },
  {
    id: 'fl-106',
    flightNumber: 'AI-101',
    airline: 'Air India',
    type: 'Arrival',
    source: 'New Delhi (DEL)',
    destination: 'AeroVista (AVX)',
    scheduledTime: '01:20 PM',
    estimatedTime: '01:20 PM',
    departureTime: '2026-09-11T05:00',
    arrivalTime: '2026-09-11T13:20',
    terminal: 'Terminal 2',
    gate: 'Gate B06',
    runway: 'Runway 09L/27R',
    status: 'On Time',
    baggageBelt: 'Belt 05',
    aircraft: 'Boeing 787-8',
  },
  {
    id: 'fl-107',
    flightNumber: 'QR-703',
    airline: 'Qatar Airways',
    type: 'Departure',
    source: 'AeroVista (AVX)',
    destination: 'Doha (DOH)',
    scheduledTime: '02:45 PM',
    estimatedTime: '02:45 PM',
    departureTime: '2026-09-11T14:45',
    arrivalTime: '2026-09-11T18:30',
    terminal: 'Terminal 3',
    gate: 'Gate A02',
    runway: 'Runway 09R/27L',
    status: 'Scheduled',
    baggageBelt: 'N/A',
    aircraft: 'Airbus A350-900',
  },
  {
    id: 'fl-108',
    flightNumber: '6E-505',
    airline: 'IndiGo',
    type: 'Departure',
    source: 'AeroVista (AVX)',
    destination: 'Mumbai (BOM)',
    scheduledTime: '04:10 PM',
    estimatedTime: '04:35 PM',
    departureTime: '2026-09-11T16:10',
    arrivalTime: '2026-09-11T18:00',
    terminal: 'Terminal 1',
    gate: 'Gate C05',
    runway: 'Runway 14/32',
    status: 'Delayed',
    baggageBelt: 'N/A',
    aircraft: 'Airbus A321neo',
  },
];

const INITIAL_RESOURCES = [
  { id: 'res-1', name: 'Gate A01', type: 'Gate', location: 'Terminal 3 - Concourse A', status: 'Occupied' },
  { id: 'res-2', name: 'Gate A04', type: 'Gate', location: 'Terminal 3 - Concourse A', status: 'Occupied' },
  { id: 'res-3', name: 'Gate B02', type: 'Gate', location: 'Terminal 2 - Concourse B', status: 'Available' },
  { id: 'res-4', name: 'Gate C12', type: 'Gate', location: 'Terminal 1 - Concourse C', status: 'Occupied' },
  { id: 'res-5', name: 'Runway 09R/27L', type: 'Runway', location: 'North Airfield', status: 'Available' },
  { id: 'res-6', name: 'Runway 09L/27R', type: 'Runway', location: 'South Airfield', status: 'Available' },
  { id: 'res-7', name: 'Baggage Belt 04', type: 'Baggage Belt', location: 'Terminal 3 - Arrivals Hall', status: 'Occupied' },
  { id: 'res-8', name: 'Check-in Counter 12-18', type: 'Check-in Counter', location: 'Terminal 3 - Departures', status: 'Available' },
];

const INITIAL_SCHEDULES = [
  {
    id: 'sch-1',
    flightNumber: 'EK-201',
    airline: 'Emirates',
    resource: 'Gate A01',
    resourceType: 'Gate',
    startTime: '2026-09-11T08:00',
    endTime: '2026-09-11T09:30',
    status: 'Completed',
  },
  {
    id: 'sch-2',
    flightNumber: 'BA-117',
    airline: 'British Airways',
    resource: 'Gate A04',
    resourceType: 'Gate',
    startTime: '2026-09-11T09:30',
    endTime: '2026-09-11T11:00',
    status: 'Active',
  },
  {
    id: 'sch-3',
    flightNumber: 'DL-088',
    airline: 'Delta Air Lines',
    resource: 'Gate C12',
    resourceType: 'Gate',
    startTime: '2026-09-11T10:30',
    endTime: '2026-09-11T12:00',
    status: 'Active',
  },
  {
    id: 'sch-4',
    flightNumber: 'LH-454',
    airline: 'Lufthansa',
    resource: 'Runway 09R/27L',
    resourceType: 'Runway',
    startTime: '2026-09-11T11:50',
    endTime: '2026-09-11T12:10',
    status: 'Scheduled',
  },
];

// Helper functions for localStorage persistence
export const getStoredFlights = () => {
  const data = localStorage.getItem('aerovista_flights');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse stored flights', e);
    }
  }
  localStorage.setItem('aerovista_flights', JSON.stringify(INITIAL_FLIGHTS));
  return INITIAL_FLIGHTS;
};

export const saveStoredFlights = (flights) => {
  localStorage.setItem('aerovista_flights', JSON.stringify(flights));
};

export const getStoredResources = () => {
  const data = localStorage.getItem('aerovista_resources');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse stored resources', e);
    }
  }
  localStorage.setItem('aerovista_resources', JSON.stringify(INITIAL_RESOURCES));
  return INITIAL_RESOURCES;
};

export const saveStoredResources = (resources) => {
  localStorage.setItem('aerovista_resources', JSON.stringify(resources));
};

export const getStoredSchedules = () => {
  const data = localStorage.getItem('aerovista_schedules');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse stored schedules', e);
    }
  }
  localStorage.setItem('aerovista_schedules', JSON.stringify(INITIAL_SCHEDULES));
  return INITIAL_SCHEDULES;
};

export const saveStoredSchedules = (schedules) => {
  localStorage.setItem('aerovista_schedules', JSON.stringify(schedules));
};
