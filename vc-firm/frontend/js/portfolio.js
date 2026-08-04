document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilters();
  loadPortfolio();
});

const portfolioData = [
  { id: 1, name: 'NeuralForge AI', sector: 'ai', stage: 'Series B', year: 2023, invested: '$12M', valuation: '$180M', description: 'Enterprise AI platform for automating complex business workflows with large language models.', logo: 'NF' },
  { id: 2, name: 'PayStream', sector: 'fintech', stage: 'Series A', year: 2022, invested: '$8M', valuation: '$95M', description: 'Real-time payment infrastructure for cross-border B2B transactions.', logo: 'PS' },
  { id: 3, name: 'MediSync', sector: 'healthtech', stage: 'Series C', year: 2021, invested: '$25M', valuation: '$420M', description: 'AI-powered clinical trial matching and patient recruitment platform.', logo: 'MS' },
  { id: 4, name: 'GreenGrid', sector: 'climate', stage: 'Series A', year: 2023, invested: '$10M', valuation: '$72M', description: 'Smart grid optimization software for renewable energy integration.', logo: 'GG' },
  { id: 5, name: 'CloudVault', sector: 'ai', stage: 'Seed', year: 2024, invested: '$3M', valuation: '$18M', description: 'Zero-knowledge encryption platform for AI model deployment in regulated industries.', logo: 'CV' },
  { id: 6, name: 'TradePulse', sector: 'fintech', stage: 'Series B', year: 2022, invested: '$15M', valuation: '$210M', description: 'Algorithmic trading infrastructure with real-time market intelligence.', logo: 'TP' },
  { id: 7, name: 'GeneSpark', sector: 'healthtech', stage: 'Series A', year: 2023, invested: '$7M', valuation: '$55M', description: 'Precision medicine platform using genomic data for personalized therapies.', logo: 'GS' },
  { id: 8, name: 'CarbonZero', sector: 'climate', stage: 'Series B', year: 2022, invested: '$20M', valuation: '$310M', description: 'Enterprise carbon tracking and offset marketplace with verified credits.', logo: 'CZ' },
  { id: 9, name: 'DataMesh', sector: 'ai', stage: 'Series A', year: 2024, invested: '$6M', valuation: '$42M', description: 'Federated data infrastructure enabling privacy-preserving AI across organizations.', logo: 'DM' },
];

function loadPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  renderPortfolio(portfolioData);
}

function renderPortfolio(data) {
  const grid = document.getElementById('portfolioGrid');
  grid.innerHTML = data.map(company => `
    <div class="portfolio-card fade-up" onclick="openCompanyModal(${company.id})" data-sector="${company.sector}">
      <div style="width:100%;height:100%;background:linear-gradient(135deg,var(--navy-mid),var(--navy));display:flex;align-items:center;justify-content:center;">
        <span style="font-size:2rem;font-weight:800;color:var(--gold);opacity:.3">${company.logo}</span>
      </div>
      <div class="portfolio-card-overlay">
        <span class="portfolio-card-tag">${company.sector} &bull; ${company.stage}</span>
        <span class="portfolio-card-title">${company.name}</span>
        <span class="portfolio-card-desc">${company.description}</span>
      </div>
    </div>
  `).join('');
}

function initPortfolioFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      const filtered = filter === 'all' ? portfolioData : portfolioData.filter(c => c.sector === filter);
      renderPortfolio(filtered);
      document.querySelectorAll('.portfolio-card.fade-up').forEach(el => {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        obs.observe(el);
      });
    });
  });
}

function openCompanyModal(id) {
  const company = portfolioData.find(c => c.id === id);
  if (!company) return;
  const modal = document.getElementById('companyModal');
  document.getElementById('modalCompanyName').textContent = company.name;
  document.getElementById('modalCompanySector').textContent = `${company.sector.toUpperCase()} | ${company.stage}`;
  document.getElementById('modalCompanyDesc').textContent = company.description;
  document.getElementById('modalCompanyYear').textContent = company.year;
  document.getElementById('modalCompanyInvested').textContent = company.invested;
  document.getElementById('modalCompanyValuation').textContent = company.valuation;
  modal.classList.add('open');
}
