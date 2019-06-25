const express = require("express");
const server = express();
server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Project 1",
    tasks: ["New task"]
  },
  {
    id: "2",
    title: "Project 2",
    tasks: ["Another task"]
  }
];

let requests = 0;

function checkProjectInArray(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project does not exist" });
  }

  return next();
}

function countRequests(req, res, next) {
  requests++;
  console.log(`Number of requests: ${requests}`);
  return next();
}

server.use(countRequests);

/* GET SINGLE PROJECT */
server.get("/projects", (req, res) => {
  return res.json(projects);
});

/* GET ALL PROJECTS */
server.get("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  return res.json(project);
});

/* POST A PROJECT */
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };
  projects.push(project);
  return res.json(project);
});

/* ADD TASK TO PROJECT */
server.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.tasks.push(title);

  return res.json(project);
});

/* EDIT PROJECT TITLE */
server.put("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
});

/* DELETE PROJECT */
server.delete("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.find(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.listen(3000);
