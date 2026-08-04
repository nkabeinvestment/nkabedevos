const API_BASE = 'https://apex-vc-api.onrender.com/api';
const JAVA_API = 'https://apex-vc-java.onrender.com/api';

async function apiRequest(url, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options
  };
  const token = localStorage.getItem('investor_token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  try {
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

const api = {
  getPortfolio: () => apiRequest(`${API_BASE}/portfolio`),
  getCompany: (id) => apiRequest(`${API_BASE}/portfolio/${id}`),
  submitContact: (data) => apiRequest(`${API_BASE}/contact`, { method: 'POST', body: JSON.stringify(data) }),
  subscribeNewsletter: (email) => apiRequest(`${API_BASE}/newsletter`, { method: 'POST', body: JSON.stringify({ email }) }),
  loginInvestor: (data) => apiRequest(`${API_BASE}/investor/login`, { method: 'POST', body: JSON.stringify(data) }),
  registerInvestor: (data) => apiRequest(`${API_BASE}/investor/register`, { method: 'POST', body: JSON.stringify(data) }),
  getInvestorDashboard: () => apiRequest(`${API_BASE}/investor/dashboard`),
  getNews: () => apiRequest(`${API_BASE}/news`),
  submitDeal: (data) => apiRequest(`${JAVA_API}/deals`, { method: 'POST', body: JSON.stringify(data) }),
  getDeals: () => apiRequest(`${JAVA_API}/deals`),
};

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '&#10003;' : '&#9888;'}</span> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 4000);
}

function formatCurrency(num) {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  return `$${num.toLocaleString()}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
