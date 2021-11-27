const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Appraisal = require("../models/Appraisal");

// route  GET api/appraisals
// desc   Get all users appraisals
// access Private
router.get("/", auth, async (req, res) => {
  try {
    const appraisals = await Appraisal.find({  team: req.user.team  }).sort({
      date: -1
    });
    res.json(appraisals);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// route  POST api/appraisals
// desc   Add new appraisal
// access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      evalperiod,
      position,
      team,
      teamleader,
      achieved,
      goals,
      wishlist,
      swot1,
      swot2,
      swot3,
      swot4,
      feedback,
      tlfeedback,
      type
    } = req.body;
    try {
      const newAppraisal = new Appraisal({
        name,
        email,
        evalperiod,
        position,
        team,
        teamleader,
        achieved,
        goals,
        wishlist,
        swot1,
        swot2,
        swot3,
        swot4,
        feedback,
        tlfeedback,
        type,
        user: req.user.id
      });

      const appraisal = await newAppraisal.save();
      res.json(appraisal);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// route  PUT api/appraisal/:id
// desc   Update appraisal
// access Private
router.put("/:id", auth, async (req, res) => {
  const {
    name,
    email,
    evalperiod,
    position,
    team,
    teamleader,
    achieved,
    goals,
    wishlist,
    swot1,
    swot2,
    swot3,
    swot4,
    feedback,
    tlfeedback,
    type
  } = req.body;
  // Build appraisal objects
  const appraisalFields = {};
  if (name) appraisalFields.name = name;
  if (email) appraisalFields.email = email;
  if (evalperiod) appraisalFields.evalperiod = evalperiod;
  if (position) appraisalFields.position = position;
  if (team) appraisalFields.team = team;
  if (teamleader) appraisalFields.teamleader = teamleader;
  if (achieved) appraisalFields.achieved = achieved;
  if (goals) appraisalFields.goals = goals;
  if (wishlist) appraisalFields.wishlist = wishlist;
  if (swot1) appraisalFields.swot1 = swot1;
  if (swot2) appraisalFields.swot2 = swot2;
  if (swot3) appraisalFields.swot3 = swot3;
  if (swot4) appraisalFields.swot4 = swot4;
  if (feedback) appraisalFields.feedback = feedback;
  if (tlfeedback) appraisalFields.tlfeedback = tlfeedback;
  if (type) appraisalFields.type = type;

  try {
    let appraisal = await Appraisal.findById(req.params.id);

    if (!appraisal) {
      return res.status(404).json({ msg: "Appraisal not found" });
    }

    appraisal = await Appraisal.findByIdAndUpdate(
      req.params.id,
      { $set: appraisalFields },
      { new: true }
    );

    res.json(appraisal);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// route  DELETE api/appraisal/:id
// desc   Update appraisal
// access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let appraisal = await Appraisal.findById(req.params.id);

    if (!appraisal) {
      return res.status(404).json({ msg: "Appraisal not found" });
    }
    // Make sure user owns appraisal
    if (appraisal.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to edit this form" });
    }

    await Appraisal.findByIdAndRemove(req.params.id);

    res.json({ msg: "Appraisal removed" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
