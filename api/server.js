const express = require("express");
const server = express();

const actionsRouter = require("./actions/actions-router");

const projectsRouter = require("./projects/projects-router");

const morgan = require("morgan");
const helmet = require("helmet");

server.use(express.json());

// Configure your server here
server.use(helmet());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send(`<h2>Let's get this code party started!</h2>`);
});
// Build your actions router in /api/actions/actions-router.js
server.use("/api/actions", actionsRouter);
// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", projectsRouter);
// Do NOT `server.listen()` inside this file!

module.exports = server;
