const express = require("express");
const server = express();
server.use(express.json());

let projects = [
  {
    id: 1,
    title: "Project 1",
    tasks: ['New task'],
  },
  {
    id: 2,
    title: "Project 2",
    tasks: ['Another task'],
  },
];

function checkProjectInArray(req, res, next) {
  const project = projects[req.params.index];

  if (!project)
    return res.status(400).json({ error: "Project does not exist"});

  req.project = project;
  console.log(project)
  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id",  (req, res) => {
  const { id } = req.params;
  return res.json(projects.filter(project => project.id == id));
});

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({ id , title, tasks })
  return res.json(projects)
});

server.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const { tasks } = req.body;
  console.log(tasks);
  return res.json(project.tasks)
})

server.put("/projects/:index", checkProjectInArray, (req, res) => {
  const { index } = req.params;
  const { id, title, tasks } = req.body;
  projects[index] = { id, title, tasks};

  return res.json(projects);
});

server.delete("/projects/:id",  (req, res) => {
  const { id } = req.params;
  projects = projects.filter(project => project.id != id);
  return res.send();
})

server.listen(3000);
