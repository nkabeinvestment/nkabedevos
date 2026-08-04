# Apex Ventures &mdash; VC Investment Firm Website

A full-stack Venture Capital investment firm website built with **Python (Flask)**, **Java (Spring Boot)**, **PHP**, **HTML**, **CSS**, and **JavaScript**.

## Tech Stack

| Layer | Technology | Hosting |
|-------|-----------|---------|
| Frontend | HTML, CSS, JavaScript | GitHub Pages |
| Python API | Flask, Flask-CORS | Render.com |
| Java API | Spring Boot 3.3, Maven | Render.com |
| PHP Services | Contact, Newsletter, Upload | Any PHP host |

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `index.html` | Hero, stats, featured portfolio, investment thesis |
| About | `about.html` | Company story, philosophy, timeline |
| Portfolio | `portfolio.html` | Filterable portfolio grid with modal details |
| Team | `team.html` | Leadership, partners, operations team |
| Contact | `contact.html` | Contact form, newsletter, office locations |
| News | `news.html` | Articles with category filtering |
| Investor Portal | `investor-portal.html` | Login, register, dashboard with portfolio performance |

## API Endpoints

### Python Flask API (`/api/`)
- `GET /api/portfolio` - List portfolio companies
- `GET /api/portfolio/:id` - Get single company
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/investor/register` - Register investor account
- `POST /api/investor/login` - Investor login
- `GET /api/investor/dashboard` - Investor dashboard data
- `GET /api/news` - Get news articles

### Java Spring Boot API (`/api/`)
- `GET /api/deals` - List deal flow submissions
- `POST /api/deals` - Submit new deal
- `PUT /api/deals/:id/status` - Update deal status
- `GET /api/deals/stats` - Deal flow statistics
- `GET /api/investors` - List investors
- `POST /api/investors` - Add investor

### PHP Services
- `contact.php` - Contact form processing + email
- `newsletter.php` - Newsletter subscription management
- `upload.php` - Pitch deck file uploads (PDF, DOC, PPT)

## Run Locally

### Frontend
Open `vc-firm/frontend/index.html` in your browser. No server needed.

### Python API
```bash
cd vc-firm/backend-python
pip install -r requirements.txt
python app.py
# API runs on http://localhost:5000
```

### Java API
```bash
cd vc-firm/backend-java
mvn clean package
java -jar target/apex-vc-api-1.0.0.jar
# API runs on http://localhost:8080
```

### PHP Services
Use PHP's built-in server:
```bash
cd vc-firm/backend-php
php -S localhost:8081
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings > Pages > Build and deployment**
3. Set Source to **GitHub Actions**
4. The included workflow will deploy automatically

## Deploy Backends to Render

1. Create a Render account at https://render.com
2. Connect your GitHub repo
3. Render will auto-detect `render.yaml` and set up both services

## Investor Portal Demo

- **Email:** demo@apexvc.com
- **Password:** demo123

## Project Structure

```
vc-firm/
├── frontend/                    # Static frontend (GitHub Pages)
│   ├── index.html               # Home page
│   ├── about.html               # About page
│   ├── portfolio.html           # Portfolio with filters
│   ├── team.html                # Team page
│   ├── contact.html             # Contact form
│   ├── news.html                # News/Blog
│   ├── investor-portal.html     # Investor login + dashboard
│   ├── css/                     # Stylesheets
│   ├── js/                      # JavaScript modules
│   └── assets/                  # Images and static assets
│
├── backend-python/              # Flask API
│   ├── app.py                   # Main application
│   ├── requirements.txt         # Python dependencies
│   ├── Procfile                 # Render/Heroku config
│   └── data/                    # JSON data storage
│
├── backend-java/                # Spring Boot API
│   ├── pom.xml                  # Maven dependencies
│   └── src/main/java/com/apex/  # Java source code
│
└── backend-php/                 # PHP services
    ├── contact.php              # Contact form handler
    ├── newsletter.php           # Newsletter subscription
    └── upload.php               # File upload handler
```
