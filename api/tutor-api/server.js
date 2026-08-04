const express = require("express");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

const TUTORS = [
  { id: "t1", name: "Amara Okafor", subjects: ["Mathematics", "Physics"], rate: 25, rating: 4.9, sessions: 212, avatar: "👩‍🏫", bio: "PhD in Applied Mathematics. 6+ years tutoring calculus, linear algebra, and mechanics.", slots: ["Mon 10:00", "Mon 14:00", "Wed 16:00", "Fri 11:00"] },
  { id: "t2", name: "James Mwangi", subjects: ["Computer Science", "Mathematics"], rate: 30, rating: 4.8, sessions: 156, avatar: "👨‍💻", bio: "Software engineer teaching programming, algorithms, and databases.", slots: ["Tue 12:00", "Wed 09:00", "Thu 15:00"] },
  { id: "t3", name: "Linda Chebet", subjects: ["English", "Economics"], rate: 20, rating: 4.7, sessions: 98, avatar: "👩‍🎓", bio: "Academic writing, literature, and economics tutor.", slots: ["Mon 16:00", "Thu 10:00", "Sat 09:00"] },
  { id: "t4", name: "Brian Otieno", subjects: ["Chemistry", "Physics"], rate: 22, rating: 4.6, sessions: 134, avatar: "👨‍🔬", bio: "Lab-focused chemistry and physics tutor.", slots: ["Tue 14:00", "Fri 15:00", "Sat 11:00"] },
];

const SUBJECTS = ["Mathematics", "Physics", "Computer Science", "Chemistry", "English", "Economics"];

let bookings = [];
let nextId = 1;

app.get("/", (_req, res) => {
  res.json({ message: "StudyMate mock API", endpoints: ["/api/tutors", "/api/tutors/:id", "/api/subjects", "/api/bookings"] });
});

app.get("/api/subjects", (_req, res) => {
  res.json(SUBJECTS);
});

app.get("/api/tutors", (req, res) => {
  let list = TUTORS;
  if (req.query.subject) {
    list = list.filter((t) => t.subjects.includes(req.query.subject));
  }
  res.json(list);
});

app.get("/api/tutors/:id", (req, res) => {
  const tutor = TUTORS.find((t) => t.id === req.params.id);
  if (!tutor) return res.status(404).json({ error: "Tutor not found" });
  res.json(tutor);
});

app.post("/api/bookings", (req, res) => {
  const { tutorId, slot, topic, student } = req.body || {};
  const tutor = TUTORS.find((t) => t.id === tutorId);
  if (!tutor) return res.status(400).json({ error: "Invalid tutor" });
  const booking = {
    id: "BK-" + String(nextId++).padStart(4, "0"),
    tutorId,
    tutorName: tutor.name,
    student: student || "Demo Student",
    subject: tutor.subjects[0],
    slot: slot || "TBD",
    topic: topic || "General session",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(booking);
  res.status(201).json(booking);
});

app.get("/api/bookings", (req, res) => {
  let list = bookings;
  if (req.query.tutor) list = list.filter((b) => b.tutorId === req.query.tutor);
  if (req.query.student) list = list.filter((b) => b.student === req.query.student);
  res.json(list);
});

app.patch("/api/bookings/:id", (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  booking.status = req.body.status || booking.status;
  res.json(booking);
});

app.listen(PORT, () => {
  console.log(`StudyMate API running on http://localhost:${PORT}`);
});