document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilters();
  loadPortfolio();
});

const companyLogos = {
  'NeuralForge AI': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#1a1a2e"/><circle cx="60" cy="48" r="20" stroke="#6C5CE7" stroke-width="3" fill="none"/><circle cx="44" cy="68" r="12" stroke="#a29bfe" stroke-width="2" fill="none"/><circle cx="76" cy="68" r="12" stroke="#a29bfe" stroke-width="2" fill="none"/><line x1="60" y1="48" x2="44" y2="68" stroke="#6C5CE7" stroke-width="2"/><line x1="60" y1="48" x2="76" y2="68" stroke="#6C5CE7" stroke-width="2"/><line x1="44" y1="68" x2="76" y2="68" stroke="#a29bfe" stroke-width="2"/><circle cx="60" cy="48" r="5" fill="#6C5CE7"/><circle cx="44" cy="68" r="4" fill="#a29bfe"/><circle cx="76" cy="68" r="4" fill="#a29bfe"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="11" font-weight="700">NEURALFORGE</text></svg>`,
  'PayStream': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#0c2340"/><path d="M35 55 L50 40 L65 55 L50 70 Z" stroke="#00b894" stroke-width="2.5" fill="rgba(0,184,148,0.15)"/><path d="M55 55 L70 40 L85 55 L70 70 Z" stroke="#55efc4" stroke-width="2.5" fill="rgba(85,239,196,0.1)"/><path d="M30 75 L50 75" stroke="#00b894" stroke-width="2" stroke-linecap="round"/><path d="M70 75 L90 75" stroke="#00b894" stroke-width="2" stroke-linecap="round"/><path d="M50 75 L50 85 L70 85 L70 75" stroke="#55efc4" stroke-width="2" fill="none"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="13" font-weight="700">PAYSTREAM</text></svg>`,
  'MediSync': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#1a1428"/><rect x="48" y="30" width="24" height="50" rx="4" stroke="#e17055" stroke-width="2.5" fill="rgba(225,112,85,0.12)"/><rect x="36" y="42" width="48" height="6" rx="3" stroke="#fab1a0" stroke-width="2" fill="rgba(250,177,160,0.1)"/><line x1="60" y1="36" x2="60" y2="74" stroke="#e17055" stroke-width="2.5" stroke-linecap="round"/><line x1="48" y1="55" x2="72" y2="55" stroke="#e17055" stroke-width="2.5" stroke-linecap="round"/><circle cx="38" cy="80" r="4" stroke="#fab1a0" stroke-width="1.5" fill="none"/><circle cx="82" cy="80" r="4" stroke="#fab1a0" stroke-width="1.5" fill="none"/><path d="M42 80 L52 72 M68 72 L78 80" stroke="#e17055" stroke-width="1.5" stroke-linecap="round"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="13" font-weight="700">MEDISYNC</text></svg>`,
  'GreenGrid': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#0d2818"/><path d="M60 30 L75 50 L65 50 L80 75 L40 75 L55 50 L45 50 Z" stroke="#00b894" stroke-width="2.5" fill="rgba(0,184,148,0.15)"/><line x1="40" y1="82" x2="80" y2="82" stroke="#55efc4" stroke-width="2" stroke-linecap="round"/><line x1="45" y1="87" x2="75" y2="87" stroke="#00b894" stroke-width="1.5" stroke-linecap="round"/><rect x="36" y="34" width="10" height="10" rx="2" stroke="#55efc4" stroke-width="1" fill="rgba(85,239,196,0.15)"/><rect x="74" y="34" width="10" height="10" rx="2" stroke="#55efc4" stroke-width="1" fill="rgba(85,239,196,0.15)"/><rect x="36" y="64" width="10" height="10" rx="2" stroke="#55efc4" stroke-width="1" fill="rgba(85,239,196,0.15)"/><rect x="74" y="64" width="10" height="10" rx="2" stroke="#55efc4" stroke-width="1" fill="rgba(85,239,196,0.15)"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="13" font-weight="700">GREENGRID</text></svg>`,
  'CloudVault': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#141a2e"/><path d="M35 62 C35 48 45 38 58 38 C68 38 76 44 78 52 C86 52 92 58 92 65 C92 72 86 78 78 78 L42 78 C34 78 28 72 28 65 C28 58 32 54 35 62Z" stroke="#74b9ff" stroke-width="2.5" fill="rgba(116,185,255,0.1)"/><rect x="50" y="58" width="20" height="24" rx="3" stroke="#0984e3" stroke-width="2" fill="rgba(9,132,227,0.12)"/><circle cx="60" cy="68" r="4" stroke="#74b9ff" stroke-width="2" fill="none"/><line x1="60" y1="72" x2="60" y2="78" stroke="#74b9ff" stroke-width="2"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="13" font-weight="700">CLOUDVAULT</text></svg>`,
  'TradePulse': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#1a1a2e"/><polyline points="28,70 40,55 52,62 64,40 76,48 88,32" stroke="#fdcb6e" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="28,70 40,55 52,62 64,40 76,48 88,32 88,80 28,80" fill="rgba(253,203,110,0.06)"/><circle cx="64" cy="40" r="3.5" fill="#fdcb6e"/><circle cx="76" cy="48" r="3.5" fill="#f39c12"/><circle cx="88" cy="32" r="3.5" fill="#e17055"/><line x1="28" y1="80" x2="92" y2="80" stroke="#636e72" stroke-width="1.5"/><line x1="28" y1="50" x2="28" y2="80" stroke="#636e72" stroke-width="1.5"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="12" font-weight="700">TRADEPULSE</text></svg>`,
  'GeneSpark': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#1a1428"/><path d="M50 30 C50 30 55 45 60 50 C65 55 70 70 70 70" stroke="#e17055" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M70 30 C70 30 65 45 60 50 C55 55 50 70 50 70" stroke="#fd79a8" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="35" r="3" fill="#e17055"/><circle cx="70" cy="35" r="3" fill="#fd79a8"/><circle cx="55" cy="48" r="3" fill="#e17055"/><circle cx="65" cy="48" r="3" fill="#fd79a8"/><circle cx="60" cy="55" r="4" fill="#e84393"/><circle cx="55" cy="65" r="3" fill="#e17055"/><circle cx="65" cy="65" r="3" fill="#fd79a8"/><circle cx="50" cy="72" r="3" fill="#e17055"/><circle cx="70" cy="72" r="3" fill="#fd79a8"/><path d="M45 78 L60 85 L75 78" stroke="#fd79a8" stroke-width="1.5" fill="none" stroke-linecap="round"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="13" font-weight="700">GENESPARK</text></svg>`,
  'CarbonZero': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#0d2818"/><circle cx="60" cy="52" r="24" stroke="#00b894" stroke-width="2.5" fill="rgba(0,184,148,0.08)"/><path d="M50 52 L57 59 L72 44" stroke="#55efc4" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 82 L60 88 L76 82" stroke="#00b894" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M48 78 L60 83 L72 78" stroke="#55efc4" stroke-width="1.5" fill="none" stroke-linecap="round"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="11" font-weight="700">CARBONZERO</text></svg>`,
  'DataMesh': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="24" fill="#141a2e"/><ellipse cx="60" cy="44" rx="28" ry="10" stroke="#a29bfe" stroke-width="2" fill="rgba(162,155,254,0.08)"/><ellipse cx="60" cy="58" rx="28" ry="10" stroke="#6C5CE7" stroke-width="2" fill="rgba(108,92,231,0.08)"/><ellipse cx="60" cy="72" rx="28" ry="10" stroke="#a29bfe" stroke-width="2" fill="rgba(162,155,254,0.08)"/><line x1="32" y1="44" x2="32" y2="72" stroke="#6C5CE7" stroke-width="1.5"/><line x1="88" y1="44" x2="88" y2="72" stroke="#6C5CE7" stroke-width="1.5"/><circle cx="32" cy="44" r="3" fill="#a29bfe"/><circle cx="88" cy="44" r="3" fill="#a29bfe"/><circle cx="32" cy="58" r="3" fill="#6C5CE7"/><circle cx="88" cy="58" r="3" fill="#6C5CE7"/><circle cx="32" cy="72" r="3" fill="#a29bfe"/><circle cx="88" cy="72" r="3" fill="#a29bfe"/><text x="60" y="102" text-anchor="middle" fill="#e0e0e0" font-family="Inter,sans-serif" font-size="13" font-weight="700">DATAMESH</text></svg>`
};

const portfolioData = [
  { id: 1, name: 'NeuralForge AI', sector: 'ai', stage: 'Series B', year: 2023, invested: '$12M', valuation: '$180M', description: 'Enterprise AI platform for automating complex business workflows with large language models.' },
  { id: 2, name: 'PayStream', sector: 'fintech', stage: 'Series A', year: 2022, invested: '$8M', valuation: '$95M', description: 'Real-time payment infrastructure for cross-border B2B transactions.' },
  { id: 3, name: 'MediSync', sector: 'healthtech', stage: 'Series C', year: 2021, invested: '$25M', valuation: '$420M', description: 'AI-powered clinical trial matching and patient recruitment platform.' },
  { id: 4, name: 'GreenGrid', sector: 'climate', stage: 'Series A', year: 2023, invested: '$10M', valuation: '$72M', description: 'Smart grid optimization software for renewable energy integration.' },
  { id: 5, name: 'CloudVault', sector: 'ai', stage: 'Seed', year: 2024, invested: '$3M', valuation: '$18M', description: 'Zero-knowledge encryption platform for AI model deployment in regulated industries.' },
  { id: 6, name: 'TradePulse', sector: 'fintech', stage: 'Series B', year: 2022, invested: '$15M', valuation: '$210M', description: 'Algorithmic trading infrastructure with real-time market intelligence.' },
  { id: 7, name: 'GeneSpark', sector: 'healthtech', stage: 'Series A', year: 2023, invested: '$7M', valuation: '$55M', description: 'Precision medicine platform using genomic data for personalized therapies.' },
  { id: 8, name: 'CarbonZero', sector: 'climate', stage: 'Series B', year: 2022, invested: '$20M', valuation: '$310M', description: 'Enterprise carbon tracking and offset marketplace with verified credits.' },
  { id: 9, name: 'DataMesh', sector: 'ai', stage: 'Series A', year: 2024, invested: '$6M', valuation: '$42M', description: 'Federated data infrastructure enabling privacy-preserving AI across organizations.' },
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
      <div class="portfolio-card-logo">${companyLogos[company.name] || ''}</div>
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
