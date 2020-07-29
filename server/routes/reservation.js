const express = require("express");
const router = express.Router();
const { Reservation } = require("../models/Reservation");
const { auth } = require("../middleware/auth");
router.post("/", (req, res) => {
  const reservation = new Reservation(req.body);

  reservation.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/findSeat", (req, res) => {
  Reservation.find({ title: req.body.title }).exec((err, seats) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, seats });
  });
});

router.post("/getMovieId", (req, res) => {
  console.log(2222, req.body.id);
  Reservation.find({ id: req.body.id }, ["_id"]).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getList", (req, res) => {
  Reservation.find().exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.get("/reservation_by_id", auth, (req, res) => {
  let type = req.query.type;
  let movieIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    movieIds = ids.map((item) => {
      return item;
    });
  }

  // Reservation.find({ userFrom: req.user._id })
  Reservation.find({ id: { $in: movieIds } })
    .populate("userForm")
    .exec((err, movie) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(movie);
    });
});

module.exports = router;
