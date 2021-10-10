// add middlewares here related to projects
const Projects = require("../projects/projects-model");

function validateProject(req, res, next) {
  const { name } = req.body;
  const { description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json({ message: "You are missing one or more required fields." });
  } else {
    next();
  }
}
function validateProjectExtra(req, res, next) {
  const { name } = req.body;
  const { description } = req.body;
  const { completed } = req.body;
  if (!name || !description || !completed) {
    res
      .status(400)
      .json({ message: "You are missing one or more required fields." });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  Projects.get(req.params.id)
    .then((projects) => {
      if (!projects) {
        res.status(404).json({
          message: `Users not found with the given ID of ${req.params.id}`,
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
}
module.exports = {
  validateProject,
  validateId,
  validateProjectExtra,
};
