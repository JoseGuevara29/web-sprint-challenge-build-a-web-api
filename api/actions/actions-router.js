// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const actionsMW = require("./actions-middlware");

const router = express.Router();

//GET] /api/actions

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//[GET] /api/actions/:id
router.get("/:id", actionsMW.validateId, (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//[POST] /api/actions
router.post(
  "/",
  actionsMW.validateId,
  actionsMW.validateActions,
  (req, res) => {
    Actions.insert(req.body)
      .then((newAction) => {
        res.status(201).json(newAction);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
);

//[PUT] /api/actions/:id
router.put(
  "/:id",
  actionsMW.validateActions,
  actionsMW.validateId,
  (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Actions.update(id, changes)
      .then((updatedAction) => {
        res.status(200).json(updatedAction);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
);

//[DELETE] /api/actions/:id
router.delete("/:id", actionsMW.validateId, (req, res) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Action has been deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
