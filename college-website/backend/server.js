const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');

function loadJSON(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return [];
}

function saveJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ── Seed data on first run ──────────────────────────────────
function seedData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(path.join(DATA_DIR, 'courses.json'))) {
    saveJSON('courses.json', [
      { id: 1, department: 'Computer Science', code: 'CS', courses: [
        { id: 101, name: 'Introduction to Computer Science', code: 'CS 101', credits: 3, level: 'intro', description: 'Fundamentals of computing, algorithms, and problem-solving with Python.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600' },
        { id: 102, name: 'Data Structures & Algorithms', code: 'CS 201', credits: 4, level: 'intermediate', description: 'Arrays, trees, graphs, sorting, and searching algorithms with practical applications.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600' },
        { id: 103, name: 'Machine Learning', code: 'CS 380', credits: 3, level: 'advanced', description: 'Supervised and unsupervised learning, neural networks, and real-world AI applications.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600' },
        { id: 104, name: 'Web Development', code: 'CS 250', credits: 3, level: 'intermediate', description: 'Full-stack web development with modern frameworks, REST APIs, and databases.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600' },
        { id: 105, name: 'Cybersecurity Fundamentals', code: 'CS 310', credits: 3, level: 'advanced', description: 'Network security, encryption, ethical hacking, and digital forensics.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600' }
      ]},
      { id: 2, department: 'Business Administration', code: 'BA', courses: [
        { id: 201, name: 'Principles of Management', code: 'BA 101', credits: 3, level: 'intro', description: 'Organizational behavior, leadership, strategic planning, and decision-making.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600' },
        { id: 202, name: 'Financial Accounting', code: 'BA 201', credits: 3, level: 'intermediate', description: 'Financial statements, bookkeeping, and accounting principles for business.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600' },
        { id: 203, name: 'Marketing Analytics', code: 'BA 305', credits: 3, level: 'advanced', description: 'Data-driven marketing, consumer behavior analysis, and digital marketing strategy.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600' },
        { id: 204, name: 'Entrepreneurship', code: 'BA 250', credits: 3, level: 'intermediate', description: 'Startup fundamentals, business model canvas, and venture funding strategies.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600' }
      ]},
      { id: 3, department: 'Engineering', code: 'EN', courses: [
        { id: 301, name: 'Engineering Mechanics', code: 'EN 101', credits: 4, level: 'intro', description: 'Statics, dynamics, and fundamental engineering principles.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600' },
        { id: 302, name: 'Circuit Analysis', code: 'EN 202', credits: 3, level: 'intermediate', description: 'Electric circuits, AC analysis, and semiconductor fundamentals.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600' },
        { id: 303, name: 'Robotics & Automation', code: 'EN 350', credits: 3, level: 'advanced', description: 'Robot kinematics, control systems, and industrial automation.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600' }
      ]},
      { id: 4, department: 'Liberal Arts', code: 'LA', courses: [
        { id: 401, name: 'Creative Writing', code: 'LA 110', credits: 3, level: 'intro', description: 'Fiction, poetry, and creative nonfiction workshop with peer critique.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600' },
        { id: 402, name: 'Psychology of Human Behavior', code: 'LA 220', credits: 3, level: 'intermediate', description: 'Cognitive psychology, social dynamics, and behavioral science research.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600' },
        { id: 403, name: 'Global History & Culture', code: 'LA 310', credits: 3, level: 'advanced', description: 'World civilizations, cultural exchange, and historical perspectives.', image: 'https://images.unsplash.com/photo-1461360370896-922624d12a3e?w=600' }
      ]},
      { id: 5, department: 'Natural Sciences', code: 'NS', courses: [
        { id: 501, name: 'Biology: Life Sciences', code: 'NS 101', credits: 4, level: 'intro', description: 'Cell biology, genetics, evolution, and ecology fundamentals.', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600' },
        { id: 502, name: 'Organic Chemistry', code: 'NS 201', credits: 4, level: 'intermediate', description: 'Carbon compounds, reaction mechanisms, and lab techniques.', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600' },
        { id: 503, name: 'Quantum Physics', code: 'NS 305', credits: 3, level: 'advanced', description: 'Quantum mechanics, wave-particle duality, and modern physics.', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600' }
      ]}
    ]);
  }

  if (!fs.existsSync(path.join(DATA_DIR, 'faculty.json'))) {
    saveJSON('faculty.json', [
      { id: 1, name: 'Dr. Sarah Chen', title: 'Professor & Chair', department: 'Computer Science', specialty: 'Artificial Intelligence & Machine Learning', email: 's.chen@oakridge.edu', bio: 'Former Google AI researcher with 15+ years in machine learning. Published 80+ papers in top-tier conferences.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
      { id: 2, name: 'Dr. James Mitchell', title: 'Associate Professor', department: 'Computer Science', specialty: 'Cybersecurity', email: 'j.mitchell@oakridge.edu', bio: 'Cybersecurity expert and former NSA consultant. Leads the university Cyber Defense Lab.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
      { id: 3, name: 'Dr. Maria Rodriguez', title: 'Professor', department: 'Business Administration', specialty: 'Finance & Economics', email: 'm.rodriguez@oakridge.edu', bio: 'Former Goldman Sachs VP turned educator. Specializes in fintech and financial modeling.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400' },
      { id: 4, name: 'Prof. David Kim', title: 'Distinguished Professor', department: 'Engineering', specialty: 'Robotics & Mechatronics', email: 'd.kim@oakridge.edu', bio: 'IEEE Fellow. Holds 12 patents in robotic systems. Advisor to DARPA projects.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
      { id: 5, name: 'Dr. Emily Watson', title: 'Associate Professor', department: 'Liberal Arts', specialty: 'Creative Writing & Literature', email: 'e.watson@oakridge.edu', bio: 'Award-winning author of three novels. MFA from Iowa Writers Workshop.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
      { id: 6, name: 'Dr. Robert Patel', title: 'Professor', department: 'Natural Sciences', specialty: 'Quantum Physics', email: 'r.patel@oakridge.edu', bio: 'CERN alumni. Pioneering research in quantum computing at the university physics lab.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' },
      { id: 7, name: 'Dr. Lisa Chang', title: 'Assistant Professor', department: 'Computer Science', specialty: 'Data Science & Analytics', email: 'l.chang@oakridge.edu', bio: 'Data science leader with experience at Netflix and Spotify. Expert in recommendation systems.', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400' },
      { id: 8, name: 'Dr. Michael Okafor', title: 'Professor', department: 'Engineering', specialty: 'Civil & Environmental Engineering', email: 'm.okafor@oakridge.edu', bio: 'Sustainable infrastructure expert. Led earthquake-resistant design projects in 5 countries.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' }
    ]);
  }

  if (!fs.existsSync(path.join(DATA_DIR, 'events.json'))) {
    saveJSON('events.json', [
      { id: 1, title: 'Fall Open Campus Day', date: '2026-09-15', time: '9:00 AM - 4:00 PM', location: 'Main Campus', category: 'admissions', description: 'Tour campus, meet faculty, attend sample lectures, and learn about financial aid.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600' },
      { id: 2, title: 'Annual Tech Innovation Summit', date: '2026-10-05', time: '10:00 AM - 6:00 PM', location: 'Engineering Building', category: 'academic', description: 'Keynote by industry leaders, hackathon, and project showcase from CS and Engineering students.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600' },
      { id: 3, title: 'Homecoming Weekend', date: '2026-10-20', time: 'All Day', location: 'Campus-wide', category: 'social', description: 'Alumni reunion, football game, live music, and the famous Oakridge tailgate party.', image: 'https://images.unsplash.com/photo-1461896836934-bd45ea8b2c8e?w=600' },
      { id: 4, title: 'Spring Career Fair', date: '2027-03-10', time: '11:00 AM - 3:00 PM', location: 'Student Center', category: 'career', description: 'Connect with 100+ employers from tech, finance, healthcare, and engineering industries.', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600' },
      { id: 5, title: 'International Cultural Festival', date: '2026-11-12', time: '5:00 PM - 10:00 PM', location: 'University Quad', category: 'social', description: 'Celebrate diversity with food, music, dance, and art from 40+ countries.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600' },
      { id: 6, title: 'Research Symposium', date: '2026-12-01', time: '9:00 AM - 5:00 PM', location: 'Science Center', category: 'academic', description: 'Undergraduate and graduate students present cutting-edge research across all disciplines.', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600' },
      { id: 7, title: 'Spring Musical Production', date: '2027-04-18', time: '7:00 PM - 10:00 PM', location: 'University Theater', category: 'arts', description: 'Student-directed musical theater production featuring original choreography and music.', image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600' },
      { id: 8, title: 'Business Plan Competition', date: '2027-02-22', time: '1:00 PM - 6:00 PM', location: 'Business School Auditorium', category: 'academic', description: 'Students pitch startup ideas to real venture capitalists. $50K in prizes.', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600' }
    ]);
  }

  if (!fs.existsSync(path.join(DATA_DIR, 'admissions.json'))) {
    saveJSON('admissions.json', {
      stats: {
        applicants: 28500,
        accepted: 6200,
        enrolled: 2100,
        acceptanceRate: 21.7,
        averageGPA: 3.87,
        averageSAT: 1420,
        averageACT: 32
      },
      deadlines: [
        { id: 1, type: 'Early Decision', date: '2026-11-01', description: 'Binding early application for students certain about Oakridge.' },
        { id: 2, type: 'Early Action', date: '2026-11-15', description: 'Non-binding early application with January notification.' },
        { id: 3, type: 'Regular Decision', date: '2027-01-05', description: 'Standard application deadline for Fall 2027 enrollment.' },
        { id: 4, type: 'Transfer Application', date: '2027-03-01', description: 'For students transferring from another college or university.' }
      ],
      requirements: [
        'Completed online application',
        'Official high school transcripts',
        'SAT or ACT scores',
        'Two letters of recommendation',
        'Personal essay',
        'Extracurricular activities list',
        'Application fee of $75 (waivers available)'
      ],
      tuition: {
        undergraduate: { tuition: 54200, roomBoard: 16800, fees: 1200, total: 72200 },
        graduate: { tuition: 48500, roomBoard: 0, fees: 1500, total: 50000 }
      },
      financialAid: {
        percentageReceiving: 62,
        averagePackage: 42000,
        workStudy: true,
        scholarships: [
          { name: 'Presidential Scholarship', amount: 'Full tuition', criteria: 'Top 1% of applicants, exceptional leadership' },
          { name: 'Dean\'s Merit Award', amount: '$25,000/year', criteria: 'Top 10% of admitted students' },
          { name: 'STEM Excellence Award', amount: '$20,000/year', criteria: 'Demonstrated STEM achievement' },
          { name: 'Community Impact Grant', amount: '$15,000/year', criteria: 'Significant community service record' }
        ]
      }
    });
  }

  if (!fs.existsSync(path.join(DATA_DIR, 'campus-life.json'))) {
    saveJSON('campus-life.json', {
      stats: [
        { number: '8,200', label: 'Students' },
        { number: '450+', label: 'Faculty' },
        { number: '120+', label: 'Student Clubs' },
        { number: '350', label: 'Acres Campus' }
      ],
      housing: [
        { name: 'Freshman Dormitories', description: 'Modern suite-style living for first-year students with communal lounges and study spaces.', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600' },
        { name: 'Upper-Class Residences', description: 'Apartment-style housing for sophomores through seniors with full kitchens.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600' },
        { name: 'Graduate Housing', description: 'Affordable family-friendly and individual apartments near campus.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600' }
      ],
      clubs: [
        { name: 'Computer Science Society', category: 'academic', members: 320 },
        { name: 'Debate & Moot Court', category: 'academic', members: 85 },
        { name: 'A Cappella Group', category: 'arts', members: 45 },
        { name: 'Student Government', category: 'leadership', members: 60 },
        { name: 'Intramural Sports League', category: 'sports', members: 800 },
        { name: 'Sustainability Collective', category: 'community', members: 200 },
        { name: 'Entrepreneurship Club', category: 'academic', members: 150 },
        { name: 'International Students Association', category: 'community', members: 400 }
      ],
      facilities: [
        { name: 'Oakridge Library', description: 'State-of-the-art library with 2 million+ volumes, 24/7 study spaces, and digital media labs.', icon: '&#128218;' },
        { name: 'Recreation Center', description: 'Olympic pool, climbing wall, fitness center, and outdoor adventure programs.', icon: '&#127947;' },
        { name: 'Innovation Hub', description: 'Makerspace with 3D printers, laser cutters, and prototyping equipment.', icon: '&#128295;' },
        { name: 'Student Union', description: 'Dining halls, cafés, book store, and event spaces in the heart of campus.', icon: '&#127970;' }
      ]
    });
  }

  if (!fs.existsSync(path.join(DATA_DIR, 'testimonials.json'))) {
    saveJSON('testimonials.json', [
      { id: 1, name: 'Alex Thompson', major: 'Computer Science, Class of 2025', text: 'Oakridge gave me the foundation to land my dream job at a top tech company. The professors genuinely care about your success.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
      { id: 2, name: 'Priya Sharma', major: 'Business Administration, Class of 2024', text: 'The entrepreneurship program helped me launch my startup before graduation. We raised $500K in seed funding.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
      { id: 3, name: 'Marcus Williams', major: 'Engineering, Class of 2023', text: 'The robotics lab is world-class. I presented my research at three international conferences as an undergrad.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' }
    ]);
  }
}

seedData();

// ── Serve static frontend files ─────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ── API Routes ──────────────────────────────────────────────

// Courses
app.get('/api/courses', (req, res) => {
  const courses = loadJSON('courses.json');
  const { department, level, search } = req.query;

  let allCourses = [];
  courses.forEach(dept => {
    dept.courses.forEach(c => {
      allCourses.push({ ...c, department: dept.department, departmentCode: dept.code });
    });
  });

  if (department && department !== 'all') {
    allCourses = allCourses.filter(c => c.departmentCode === department);
  }
  if (level && level !== 'all') {
    allCourses = allCourses.filter(c => c.level === level);
  }
  if (search) {
    const q = search.toLowerCase();
    allCourses = allCourses.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }

  res.json({ data: allCourses, departments: courses.map(c => ({ code: c.code, name: c.department })), total: allCourses.length });
});

app.get('/api/courses/departments', (req, res) => {
  const courses = loadJSON('courses.json');
  res.json({ data: courses.map(c => ({ code: c.code, name: c.department, count: c.courses.length })) });
});

app.get('/api/courses/:id', (req, res) => {
  const courses = loadJSON('courses.json');
  for (const dept of courses) {
    const course = dept.courses.find(c => c.id === Number(req.params.id));
    if (course) return res.json({ data: { ...course, department: dept.department } });
  }
  res.status(404).json({ error: 'Course not found' });
});

// Faculty
app.get('/api/faculty', (req, res) => {
  let faculty = loadJSON('faculty.json');
  const { department, search } = req.query;
  if (department && department !== 'all') {
    faculty = faculty.filter(f => f.department.toLowerCase().includes(department.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase();
    faculty = faculty.filter(f => f.name.toLowerCase().includes(q) || f.specialty.toLowerCase().includes(q));
  }
  res.json({ data: faculty, total: faculty.length });
});

app.get('/api/faculty/:id', (req, res) => {
  const faculty = loadJSON('faculty.json');
  const member = faculty.find(f => f.id === Number(req.params.id));
  if (!member) return res.status(404).json({ error: 'Faculty not found' });
  res.json({ data: member });
});

// Events
app.get('/api/events', (req, res) => {
  let events = loadJSON('events.json');
  const { category, upcoming } = req.query;
  if (category && category !== 'all') {
    events = events.filter(e => e.category === category);
  }
  if (upcoming === 'true') {
    events = events.filter(e => new Date(e.date) >= new Date());
  }
  res.json({ data: events, total: events.length });
});

app.get('/api/events/:id', (req, res) => {
  const events = loadJSON('events.json');
  const event = events.find(e => e.id === Number(req.params.id));
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json({ data: event });
});

// Admissions
app.get('/api/admissions', (req, res) => {
  const admissions = loadJSON('admissions.json');
  res.json({ data: admissions });
});

// Campus Life
app.get('/api/campus-life', (req, res) => {
  const campus = loadJSON('campus-life.json');
  res.json({ data: campus });
});

// Testimonials
app.get('/api/testimonials', (req, res) => {
  const testimonials = loadJSON('testimonials.json');
  res.json({ data: testimonials });
});

// Contact Form
app.post('/api/contact', (req, res) => {
  const data = req.body;
  const required = ['name', 'email', 'message'];
  for (const field of required) {
    if (!data[field]) return res.status(400).json({ error: `${field} is required` });
  }
  const contacts = loadJSON('contacts.json');
  const contact = {
    id: contacts.length + 1,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    subject: data.subject || 'general',
    message: data.message,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  contacts.push(contact);
  saveJSON('contacts.json', contacts);
  res.status(201).json({ message: 'Your message has been sent successfully!', id: contact.id });
});

// Newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  const subscribers = loadJSON('newsletter.json');
  if (subscribers.find(s => s.email === email)) {
    return res.json({ message: 'You are already subscribed!' });
  }
  subscribers.push({ id: subscribers.length + 1, email, subscribedAt: new Date().toISOString(), active: true });
  saveJSON('newsletter.json', subscribers);
  res.status(201).json({ message: 'Successfully subscribed to newsletter!' });
});

// Virtual Tour (returns image galleries)
app.get('/api/virtual-tour', (req, res) => {
  res.json({
    data: [
      { id: 1, name: 'Main Quad', description: 'The historic heart of campus with Gothic architecture.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800' },
      { id: 2, name: 'Science Center', description: 'Modern research labs and collaborative spaces.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800' },
      { id: 3, name: 'Student Union', description: 'Dining, activities, and student services hub.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800' },
      { id: 4, name: 'Athletic Complex', description: 'Olympic-grade facilities for all sports.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800' },
      { id: 5, name: 'Innovation Hub', description: 'Where ideas become prototypes.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800' },
      { id: 6, name: 'Arts Center', description: 'Theater, gallery, and music studios.', image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800' }
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Oakridge University API', timestamp: new Date().toISOString() });
});

// SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'frontend', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Oakridge University API running on http://localhost:${PORT}`);
});
