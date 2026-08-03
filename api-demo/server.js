const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const projects = [
  { id: 1, name: "Todo List App", stack: ["HTML", "CSS", "JavaScript"] },
  { id: 2, name: "React Counter", stack: ["React", "Hooks"] },
];

const visits = { total: 0 };

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API demo",
    endpoints: ["/api/projects", "/api/projects/:id", "/api/visit"],
  });
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
});

app.post("/api/visit", (req, res) => {
  visits.total += 1;
  res.json(visits);
});

app.listen(PORT, () => {
  console.log(`Portfolio API listening on http://localhost:${PORT}`);
});
