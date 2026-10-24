const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
}

// Auth API
export const loginAdmin = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

// Flight APIs
export const fetchFlights = async () => {
  const res = await fetch(`${API_BASE_URL}/flights`);
  return handleResponse(res);
};

// Fetch flight statistics
export const fetchFlightStats = async () => {
  const res = await fetch(`${API_BASE_URL}/flights/stats`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};

export const createFlight = async (flightData) => {
  const res = await fetch(`${API_BASE_URL}/flights`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(flightData),
  });
  return handleResponse(res);
};

export const updateFlight = async (id, flightData) => {
  const res = await fetch(`${API_BASE_URL}/flights/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(flightData),
  });
  return handleResponse(res);
};

export const deleteFlight = async (id) => {
  const res = await fetch(`${API_BASE_URL}/flights/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// Resource APIs
export const fetchResources = async () => {
  const res = await fetch(`${API_BASE_URL}/resources`);
  return handleResponse(res);
};

export const createResource = async (resourceData) => {
  const res = await fetch(`${API_BASE_URL}/resources`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(resourceData),
  });
  return handleResponse(res);
};

export const updateResource = async (id, resourceData) => {
  const res = await fetch(`${API_BASE_URL}/resources/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(resourceData),
  });
  return handleResponse(res);
};

export const deleteResource = async (id) => {
  const res = await fetch(`${API_BASE_URL}/resources/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

// Schedule APIs
export const fetchSchedules = async () => {
  const res = await fetch(`${API_BASE_URL}/schedules`);
  return handleResponse(res);
};

export const createSchedule = async (scheduleData) => {
  const res = await fetch(`${API_BASE_URL}/schedules`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(scheduleData),
  });
  return handleResponse(res);
};

export const updateSchedule = async (id, scheduleData) => {
  const res = await fetch(`${API_BASE_URL}/schedules/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(scheduleData),
  });
  return handleResponse(res);
};

export const deleteSchedule = async (id) => {
  const res = await fetch(`${API_BASE_URL}/schedules/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};
