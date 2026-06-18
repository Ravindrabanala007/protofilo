const API_BASE = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api`
  : 'http://localhost:5000/api';

/** Returns the backend origin (no /api suffix) for resolving asset URLs */
export const getBackendUrl = () =>
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const getToken = () => sessionStorage.getItem('admin_token');

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

// ─── Auth ────────────────────────────────────────────
export const loginAdmin = (username, password) =>
  apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

// ─── Composite Fetch (all sections at once) ──────────
export const fetchAllSections = () => apiRequest('/sections/all');

// ─── Legacy Portfolio (backward compat) ──────────────
export const getPortfolio = () => apiRequest('/portfolio');
export const updatePortfolio = (data) =>
  apiRequest('/portfolio', { method: 'PUT', body: JSON.stringify(data) });

// ─── Settings ────────────────────────────────────────
export const getSettings = () => apiRequest('/sections/settings');
export const updateSettings = (data) =>
  apiRequest('/sections/settings', { method: 'PUT', body: JSON.stringify(data) });

// ─── Maintenance Mode ───────────────────────────────
export const getMaintenanceStatus = () => apiRequest('/sections/maintenance');
export const toggleMaintenanceMode = (maintenanceMode) =>
  apiRequest('/sections/maintenance', { method: 'PUT', body: JSON.stringify({ maintenanceMode }) });

export const getGlobalBlastStatus = () => apiRequest('/sections/global-blast');
export const toggleGlobalBlast = (globalBlast) =>
  apiRequest('/sections/global-blast', { method: 'PUT', body: JSON.stringify({ globalBlast }) });

// ─── Projects ────────────────────────────────────────
export const getProjects = () => apiRequest('/sections/projects');
export const createProject = (data) =>
  apiRequest('/sections/projects', { method: 'POST', body: JSON.stringify(data) });
export const updateProject = (id, data) =>
  apiRequest(`/sections/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProject = (id) =>
  apiRequest(`/sections/projects/${id}`, { method: 'DELETE' });

// ─── Skills ──────────────────────────────────────────
export const getSkills = () => apiRequest('/sections/skills');
export const createSkill = (data) =>
  apiRequest('/sections/skills', { method: 'POST', body: JSON.stringify(data) });
export const updateSkill = (id, data) =>
  apiRequest(`/sections/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteSkill = (id) =>
  apiRequest(`/sections/skills/${id}`, { method: 'DELETE' });

// ─── Certifications ─────────────────────────────────
export const getCertifications = () => apiRequest('/sections/certifications');
export const createCertification = (data) =>
  apiRequest('/sections/certifications', { method: 'POST', body: JSON.stringify(data) });
export const updateCertification = (id, data) =>
  apiRequest(`/sections/certifications/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteCertification = (id) =>
  apiRequest(`/sections/certifications/${id}`, { method: 'DELETE' });

// ─── Education ───────────────────────────────────────
export const getEducation = () => apiRequest('/sections/education');
export const createEducation = (data) =>
  apiRequest('/sections/education', { method: 'POST', body: JSON.stringify(data) });
export const updateEducation = (id, data) =>
  apiRequest(`/sections/education/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteEducation = (id) =>
  apiRequest(`/sections/education/${id}`, { method: 'DELETE' });

// ─── Experience ──────────────────────────────────────
export const getExperience = () => apiRequest('/sections/experience');
export const createExperience = (data) =>
  apiRequest('/sections/experience', { method: 'POST', body: JSON.stringify(data) });
export const updateExperience = (id, data) =>
  apiRequest(`/sections/experience/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteExperience = (id) =>
  apiRequest(`/sections/experience/${id}`, { method: 'DELETE' });

// ─── Achievements ────────────────────────────────────
export const getAchievements = () => apiRequest('/sections/achievements');
export const updateAchievements = (data) =>
  apiRequest('/sections/achievements', { method: 'PUT', body: JSON.stringify(data) });

// ─── Categories ──────────────────────────────────────
export const getCategories = (type) => apiRequest(`/sections/categories/${type}`);
export const createCategory = (name, type) =>
  apiRequest('/sections/categories', { method: 'POST', body: JSON.stringify({ name, type }) });
export const deleteCategoryById = (id) =>
  apiRequest(`/sections/categories/${id}`, { method: 'DELETE' });

// ─── Contact ─────────────────────────────────────────
export const submitContact = (data) =>
  apiRequest('/contact', { method: 'POST', body: JSON.stringify(data) });
export const getContacts = () => apiRequest('/contact');
export const deleteContact = (id) =>
  apiRequest(`/contact/${id}`, { method: 'DELETE' });

// ─── Notifications ───────────────────────────────────
export const getActiveNotification = () => apiRequest('/notifications/active');
export const getNotifications = () => apiRequest('/notifications');
export const createNotification = (data) =>
  apiRequest('/notifications', { method: 'POST', body: JSON.stringify(data) });
export const toggleNotification = (id, isActive) =>
  apiRequest(`/notifications/${id}`, { method: 'PUT', body: JSON.stringify({ isActive }) });
export const toggleNotificationBlast = (id, isBlast) =>
  apiRequest(`/notifications/${id}`, { method: 'PUT', body: JSON.stringify({ isBlast }) });
export const deleteNotification = (id) =>
  apiRequest(`/notifications/${id}`, { method: 'DELETE' });

// ─── File Upload ─────────────────────────────────────
export const uploadFile = async (file, folder = 'uploads') => {
  const formData = new FormData();
  formData.append('file', file);

  const token = getToken();
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/upload?folder=${folder}`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'File upload failed.');
  }

  return response.json();
};

// ─── Health Check ────────────────────────────────────
export const healthCheck = () => apiRequest('/health');
