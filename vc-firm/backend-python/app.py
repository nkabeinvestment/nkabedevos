import os
import json
import hashlib
import secrets
from datetime import datetime, timedelta
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from functools import wraps

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', secrets.token_hex(32))

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        with open(path, 'r') as f:
            return json.load(f)
    return []

def save_json(filename, data):
    path = os.path.join(DATA_DIR, filename)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# ── Portfolio ──────────────────────────────────────────────
@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    portfolio = load_json('portfolio.json')
    sector = request.args.get('sector')
    if sector and sector != 'all':
        portfolio = [c for c in portfolio if c.get('sector') == sector]
    return jsonify({'data': portfolio, 'total': len(portfolio)})

@app.route('/api/portfolio/<int:company_id>', methods=['GET'])
def get_company(company_id):
    portfolio = load_json('portfolio.json')
    company = next((c for c in portfolio if c['id'] == company_id), None)
    if not company:
        return jsonify({'error': 'Company not found'}), 404
    return jsonify({'data': company})

# ── Contact Form ───────────────────────────────────────────
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    required = ['name', 'email', 'message']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    contacts = load_json('contacts.json')
    contact = {
        'id': len(contacts) + 1,
        'name': data['name'],
        'email': data['email'],
        'company': data.get('company', ''),
        'subject': data.get('subject', 'general'),
        'message': data['message'],
        'status': 'new',
        'created_at': datetime.utcnow().isoformat()
    }
    contacts.append(contact)
    save_json('contacts.json', contacts)
    return jsonify({'message': 'Contact form submitted successfully', 'id': contact['id']}), 201

# ── Newsletter ─────────────────────────────────────────────
@app.route('/api/newsletter', methods=['POST'])
def subscribe_newsletter():
    data = request.get_json()
    if not data.get('email'):
        return jsonify({'error': 'Email is required'}), 400
    subscribers = load_json('newsletter.json')
    if any(s['email'] == data['email'] for s in subscribers):
        return jsonify({'message': 'Already subscribed'})
    subscriber = {
        'id': len(subscribers) + 1,
        'email': data['email'],
        'subscribed_at': datetime.utcnow().isoformat(),
        'active': True
    }
    subscribers.append(subscriber)
    save_json('newsletter.json', subscribers)
    return jsonify({'message': 'Subscribed successfully'}), 201

# ── News ───────────────────────────────────────────────────
@app.route('/api/news', methods=['GET'])
def get_news():
    articles = load_json('news.json')
    category = request.args.get('category')
    if category and category != 'all':
        articles = [a for a in articles if a.get('category') == category]
    return jsonify({'data': articles, 'total': len(articles)})

# ── Investor Auth ──────────────────────────────────────────
INVESTORS_DB = {
    'demo@apexvc.com': {
        'id': 1,
        'name': 'Demo Investor',
        'email': 'demo@apexvc.com',
        'password': hash_password('demo123'),
        'role': 'investor'
    }
}

@app.route('/api/investor/register', methods=['POST'])
def register_investor():
    data = request.get_json()
    required = ['name', 'email', 'password']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    if data['email'] in INVESTORS_DB:
        return jsonify({'error': 'Email already registered'}), 400
    if len(data['password']) < 8:
        return jsonify({'error': 'Password must be at least 8 characters'}), 400
    investor_id = len(INVESTORS_DB) + 1
    INVESTORS_DB[data['email']] = {
        'id': investor_id,
        'name': data['name'],
        'email': data['email'],
        'password': hash_password(data['password']),
        'role': 'investor'
    }
    token = secrets.token_hex(32)
    return jsonify({
        'token': token,
        'name': data['name'],
        'email': data['email'],
        'message': 'Account created successfully'
    }), 201

@app.route('/api/investor/login', methods=['POST'])
def login_investor():
    data = request.get_json()
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    investor = INVESTORS_DB.get(data['email'])
    if not investor or investor['password'] != hash_password(data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    token = secrets.token_hex(32)
    return jsonify({
        'token': token,
        'name': investor['name'],
        'email': investor['email'],
        'message': 'Login successful'
    })

@app.route('/api/investor/dashboard', methods=['GET'])
def investor_dashboard():
    portfolio = [
        {'company': 'NeuralForge AI', 'sector': 'AI', 'invested': 12000000, 'currentValue': 36000000, 'returnPct': 200, 'status': 'active'},
        {'company': 'PayStream', 'sector': 'FinTech', 'invested': 8000000, 'currentValue': 19000000, 'returnPct': 137, 'status': 'active'},
        {'company': 'MediSync', 'sector': 'HealthTech', 'invested': 25000000, 'currentValue': 52000000, 'returnPct': 108, 'status': 'active'},
        {'company': 'GreenGrid', 'sector': 'Climate', 'invested': 10000000, 'currentValue': 14400000, 'returnPct': 44, 'status': 'pending'},
        {'company': 'CloudVault', 'sector': 'AI', 'invested': 3000000, 'currentValue': 3600000, 'returnPct': 20, 'status': 'active'},
    ]
    return jsonify({
        'portfolio': portfolio,
        'totalInvested': sum(i['invested'] for i in portfolio),
        'totalValue': sum(i['currentValue'] for i in portfolio),
        'activeInvestments': len([i for i in portfolio if i['status'] == 'active']),
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'Apex Ventures API', 'timestamp': datetime.utcnow().isoformat()})

if __name__ == '__main__':
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(os.path.join(DATA_DIR, 'portfolio.json')):
        save_json('portfolio.json', [
            {'id': 1, 'name': 'NeuralForge AI', 'sector': 'ai', 'stage': 'Series B', 'year': 2023, 'invested': '$12M', 'valuation': '$180M', 'description': 'Enterprise AI platform for automating complex business workflows with large language models.', 'logo': 'NF'},
            {'id': 2, 'name': 'PayStream', 'sector': 'fintech', 'stage': 'Series A', 'year': 2022, 'invested': '$8M', 'valuation': '$95M', 'description': 'Real-time payment infrastructure for cross-border B2B transactions.', 'logo': 'PS'},
            {'id': 3, 'name': 'MediSync', 'sector': 'healthtech', 'stage': 'Series C', 'year': 2021, 'invested': '$25M', 'valuation': '$420M', 'description': 'AI-powered clinical trial matching and patient recruitment platform.', 'logo': 'MS'},
            {'id': 4, 'name': 'GreenGrid', 'sector': 'climate', 'stage': 'Series A', 'year': 2023, 'invested': '$10M', 'valuation': '$72M', 'description': 'Smart grid optimization software for renewable energy integration.', 'logo': 'GG'},
            {'id': 5, 'name': 'CloudVault', 'sector': 'ai', 'stage': 'Seed', 'year': 2024, 'invested': '$3M', 'valuation': '$18M', 'description': 'Zero-knowledge encryption platform for AI model deployment in regulated industries.', 'logo': 'CV'},
            {'id': 6, 'name': 'TradePulse', 'sector': 'fintech', 'stage': 'Series B', 'year': 2022, 'invested': '$15M', 'valuation': '$210M', 'description': 'Algorithmic trading infrastructure with real-time market intelligence.', 'logo': 'TP'},
            {'id': 7, 'name': 'GeneSpark', 'sector': 'healthtech', 'stage': 'Series A', 'year': 2023, 'invested': '$7M', 'valuation': '$55M', 'description': 'Precision medicine platform using genomic data for personalized therapies.', 'logo': 'GS'},
            {'id': 8, 'name': 'CarbonZero', 'sector': 'climate', 'stage': 'Series B', 'year': 2022, 'invested': '$20M', 'valuation': '$310M', 'description': 'Enterprise carbon tracking and offset marketplace with verified credits.', 'logo': 'CZ'},
            {'id': 9, 'name': 'DataMesh', 'sector': 'ai', 'stage': 'Series A', 'year': 2024, 'invested': '$6M', 'valuation': '$42M', 'description': 'Federated data infrastructure enabling privacy-preserving AI across organizations.', 'logo': 'DM'},
        ])
    if not os.path.exists(os.path.join(DATA_DIR, 'news.json')):
        save_json('news.json', [
            {'id': 1, 'title': 'Apex Ventures Closes Fund IV at $2.5 Billion', 'category': 'announcement', 'date': '2026-07-15', 'excerpt': 'Our largest fund to date will focus on the AI transformation.'},
            {'id': 2, 'title': 'NeuralForge AI Raises $85M Series C', 'category': 'portfolio', 'date': '2026-06-28', 'excerpt': 'Portfolio company NeuralForge reaches unicorn status.'},
            {'id': 3, 'title': 'The AI Infrastructure Stack: Where We Invest', 'category': 'insight', 'date': '2026-06-10', 'excerpt': 'James Chen on our thesis for AI infrastructure investments.'},
        ])
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
