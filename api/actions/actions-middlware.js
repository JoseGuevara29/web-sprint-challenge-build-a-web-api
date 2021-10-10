// add middlewares here related to actions
const Actions = require("./actions-model");

// add middlewares here related to actions
function validateId(req, res, next) {
  Actions.get(req.params.id)
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

function validateActions(req, res, next) {
  const { project_id } = req.body;
  const { description } = req.body;
  const { notes } = req.body;

  if (!notes || !description || !project_id) {
    res
      .status(400)
      .json({ message: "You are missing one or more required fields." });
  } else {
    next();
  }
}
module.exports = {
  validateActions,
  validateId,
};
