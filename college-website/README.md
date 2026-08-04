# Oakridge University - Full-Stack College Website

A modern, full-stack college website built with Node.js/Express backend and vanilla HTML/CSS/JavaScript frontend. Features a complete API-driven architecture with beautiful responsive design.

## Features

- **6 HTML Pages**: Home, About, Academics, Admissions, Campus Life, Contact
- **Node.js/Express Backend**: RESTful API with 12+ endpoints
- **Dynamic Content**: All data served from JSON files via API
- **Responsive Design**: Mobile-first, works on all devices
- **Interactive Elements**: Course filtering, event category filters, contact form, newsletter
- **Free Images**: Uses Unsplash free-to-use images for all visuals
- **Animations**: Scroll-triggered fade-up animations and counter animations
- **Toast Notifications**: User feedback on form submissions

## Tech Stack

| Layer     | Technology              |
|-----------|------------------------|
| Frontend  | HTML5, CSS3, Vanilla JS |
| Backend   | Node.js, Express.js     |
| Data      | JSON files              |
| Images    | Unsplash (free)         |
| Fonts     | Google Fonts (Inter, Playfair Display) |

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/courses          | List courses (filterable)|
| GET    | /api/courses/departments | List departments      |
| GET    | /api/courses/:id      | Get single course        |
| GET    | /api/faculty          | List faculty             |
| GET    | /api/events           | List events              |
| GET    | /api/admissions       | Admissions data          |
| GET    | /api/campus-life      | Campus life data         |
| GET    | /api/testimonials     | Student testimonials     |
| GET    | /api/virtual-tour     | Virtual tour locations   |
| POST   | /api/contact          | Submit contact form      |
| POST   | /api/newsletter       | Subscribe to newsletter  |
| GET    | /api/health           | Health check             |

## Run Locally

```bash
cd college-website/backend
npm install
npm start
# Open http://localhost:4000
```

## Pages

1. **Home** - Hero with campus photo, stats, programs, testimonials, events
2. **About** - History, mission/vision/values, faculty, stats
3. **Academics** - Course catalog with department filters, faculty cards
4. **Admissions** - Stats, deadlines, requirements, tuition, scholarships
5. **Campus Life** - Events, housing, clubs, facilities, virtual tour
6. **Contact** - Contact form, info, newsletter subscription