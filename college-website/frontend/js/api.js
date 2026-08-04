const API_BASE = window.location.port === '4000' ? 'http://localhost:4000/api' : '/api';

async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return null;
  }
}
const CollegeAPI = {
  getCourses: (params = {}) => apiFetch(`/courses?${new URLSearchParams(params)}`),
  getDepartments: () => apiFetch('/courses/departments'),
  getCourse: (id) => apiFetch(`/courses/${id}`),
  getFaculty: (params = {}) => apiFetch(`/faculty?${new URLSearchParams(params)}`),
  getEvents: (params = {}) => apiFetch(`/events?${new URLSearchParams(params)}`),
  getAdmissions: () => apiFetch('/admissions'),
  getCampusLife: () => apiFetch('/campus-life'),
  getTestimonials: () => apiFetch('/testimonials'),
  getVirtualTour: () => apiFetch('/virtual-tour'),
  submitContact: (data) => apiFetch('/contact', { method: 'POST', body: JSON.stringify(data) }),
  subscribeNewsletter: (email) => apiFetch('/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
};
