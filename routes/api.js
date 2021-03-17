// api endpoints:
// /api/workouts get
// /api/worouts/:id PUT
// /api/workouts post
// /api/workouts/range get

const router = require("express").Router();

var db = require("../models");
// gets the workoutdata/aggregate from db for index.html
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    { $addFields: { totalDuration: { $sum: `$exercises.duration` } } },
  ])
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => res.json(err));
});
//gets the workoutdata/aggregate from db for stats.html
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    { $addFields: { totalDuration: { $sum: `$exercises.duration` } } },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => res.json(err));
});
// create a new workout from user input then store in db
router.post("/api/workouts", async (req, res) => {
  const cb = await db.Workout.create(req.body).then((workouts) => {
    res.json(workouts);
  });
});
// updates an exsisting workout based on ID
router.put("/api/workouts/:id", (req, res) => {
  console.log("yoyoyoyo", req.body);
  db.Workout.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true, runValidators: true }
  ).then((workouts) => {
    res.json(workouts);
  });
});
module.exports = router;
