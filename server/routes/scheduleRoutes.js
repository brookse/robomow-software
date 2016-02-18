var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Schedule = require('../models/schedule.js');

/* Get all schedules */
router.get('/:id', function(req, res) {
  Schedule.find({mowerSN: req.params.id}, function(error, schedules) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error fetching all schedules"
      });
    }
    return res.status(200).json({
      status: 'schedules found!',
      schedules: schedules
    });
  });
});

/* Create a schedule */
router.post('/', function(req, res, next) {
  console.log('rb:',req.body);
  Schedule.create({
    days: req.body.days,
    time: req.body.time,
    mowerSN: req.body.mowerSN
  }, function(error, schedule) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error creating schedule",
        schedule: schedule
      });
    }
    console.log('schedule created!');
    return res.status(200).json({
      status: 'schedule created!',
      schedule: schedule
    });
  });
});

/* Delete a schedule */
router.delete('/:id', function(req, res) {
  Schedule.remove(req.params.id, function(error, schedule) {
    if(error) {
      console.log('error: ',error);
      return res.status(500).json({
        err: error,
        detail: "error deleting schedule",
        schedule: schedule
      })
    }
    console.log('schedule deleted!');
    return res.status(200).json({
      status: 'schedule deleted!'
    });
  });
});

module.exports = router;
