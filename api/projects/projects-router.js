// Write your "projects" router here!
const express = require("express");
const Projects = require("../projects/projects-model");
const projectsMW = require("./projects-middleware");

const router = express.Router();

//[GET] /api/projects
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//[GET] /api/projects/:id
router.get("/:id", projectsMW.validateId, (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//[POST] /api/projects
router.post("/", projectsMW.validateProject, (req, res) => {
  //   console.log("req.body: ", req.body);
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//[PUT] /api/projects/:id
router.put(
  "/:id",
  projectsMW.validateProject,
  projectsMW.validateId,
  // projectsMW.validateProjectExtra,
  (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Projects.update(id, changes)
      .then((upadateProject) => {
        res.status(200).json(upadateProject);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
);

//[DELETE] /api/projects/:id
router.delete("/:id", projectsMW.validateId, (req, res) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "User has been deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});
//[GET] /api/projects/:id/actions
router.get("/:id/actions", projectsMW.validateId, (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then((projectsActions) => {
      res.status(200).json(projectsActions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;