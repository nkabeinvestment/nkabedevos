document.addEventListener('DOMContentLoaded', () => {
  initAuthForms();
  initDashboard();
  checkAuth();
});

function checkAuth() {
  const token = localStorage.getItem('investor_token');
  const loginSection = document.getElementById('loginSection');
  const dashboardSection = document.getElementById('dashboardSection');
  if (!loginSection || !dashboardSection) return;
  if (token) {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    loadDashboard();
  } else {
    loginSection.style.display = 'block';
    dashboardSection.style.display = 'none';
  }
}

function initAuthForms() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTabs = document.querySelectorAll('.login-tab');

  loginTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      loginTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      document.getElementById('loginFormContainer').style.display = target === 'login' ? 'block' : 'none';
      document.getElementById('registerFormContainer').style.display = target === 'register' ? 'block' : 'none';
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('button[type="submit"]');
      btn.textContent = 'Signing in...';
      btn.disabled = true;
      try {
        const data = await api.loginInvestor({
          email: loginForm.querySelector('[name="email"]').value,
          password: loginForm.querySelector('[name="password"]').value,
        });
        localStorage.setItem('investor_token', data.token);
        localStorage.setItem('investor_name', data.name);
        showToast('Welcome back!');
        checkAuth();
      } catch (err) {
        showToast('Invalid credentials. Try demo@apexvc.com / demo123', 'error');
      }
      btn.textContent = 'Sign In';
      btn.disabled = false;
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = registerForm.querySelector('button[type="submit"]');
      btn.textContent = 'Creating account...';
      btn.disabled = true;
      try {
        const data = await api.registerInvestor({
          name: registerForm.querySelector('[name="name"]').value,
          email: registerForm.querySelector('[name="email"]').value,
          password: registerForm.querySelector('[name="password"]').value,
        });
        localStorage.setItem('investor_token', data.token);
        localStorage.setItem('investor_name', data.name);
        showToast('Account created!');
        checkAuth();
      } catch (err) {
        showToast('Registration failed. Please try again.', 'error');
      }
      btn.textContent = 'Create Account';
      btn.disabled = false;
    });
  }
}

function initDashboard() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('investor_token');
      localStorage.removeItem('investor_name');
      showToast('Signed out successfully');
      checkAuth();
    });
  }
}

async function loadDashboard() {
  const nameEl = document.getElementById('investorName');
  const name = localStorage.getItem('investor_name');
  if (nameEl && name) nameEl.textContent = name;
  try {
    const data = await api.getInvestorDashboard();
    if (data.portfolio) renderInvestorPortfolio(data.portfolio);
    if (data.performance) renderPerformance(data.performance);
  } catch (err) {
    renderDemoDashboard();
  }
}

function renderDemoDashboard() {
  const portfolioTable = document.getElementById('portfolioTableBody');
  if (!portfolioTable) return;
  const demoInvestments = [
    { company: 'NeuralForge AI', sector: 'AI', invested: '$12M', currentValue: '$36M', return: '+200%', status: 'active' },
    { company: 'PayStream', sector: 'FinTech', invested: '$8M', currentValue: '$19M', return: '+137%', status: 'active' },
    { company: 'MediSync', sector: 'HealthTech', invested: '$25M', currentValue: '$52M', return: '+108%', status: 'active' },
    { company: 'GreenGrid', sector: 'Climate', invested: '$10M', currentValue: '$14.4M', return: '+44%', status: 'pending' },
    { company: 'CloudVault', sector: 'AI', invested: '$3M', currentValue: '$3.6M', return: '+20%', status: 'active' },
  ];
  portfolioTable.innerHTML = demoInvestments.map(inv => `
    <tr>
      <td><strong>${inv.company}</strong></td>
      <td>${inv.sector}</td>
      <td>${inv.invested}</td>
      <td>${inv.currentValue}</td>
      <td><span style="color:var(--success)">${inv.return}</span></td>
      <td><span class="status status-${inv.status === 'active' ? 'success' : 'pending'}">${inv.status}</span></td>
    </tr>
  `).join('');
}

function renderInvestorPortfolio(portfolio) {
  const table = document.getElementById('portfolioTableBody');
  if (!table || !portfolio) return;
  table.innerHTML = portfolio.map(inv => `
    <tr>
      <td><strong>${inv.company}</strong></td>
      <td>${inv.sector}</td>
      <td>${formatCurrency(inv.invested)}</td>
      <td>${formatCurrency(inv.currentValue)}</td>
      <td><span style="color:var(--success)">+${inv.returnPct}%</span></td>
      <td><span class="status status-${inv.status}">${inv.status}</span></td>
    </tr>
  `).join('');
}

function logout() {
  localStorage.removeItem('investor_token');
  localStorage.removeItem('investor_name');
  checkAuth();
}
