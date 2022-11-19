/* eslint-disable consistent-return */
const express = require('express');
const schema = require('../db/schema');
const db = require('../db/connection');

const stations = db.get('stations');

const router = express.Router();

/* Get all stations */
router.get('/', async (req, res, next) => {
  try {
    const allStations = await stations.find({});
    res.json(allStations);
  } catch (error) {
    next(error);
  }
});

/* Get a specific station */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const station = await stations.findOne({
      _id: id,
    });

    if (!station) {
      const error = new Error('station does not exist');
      return next(error);
    }

    res.json(station);
  } catch (error) {
    next(error);
  }
});

/* Create a new station */
router.post('/', async (req, res, next) => {
  try {
    const obj = req.body;
    // console.log(obj);
    await schema.validateAsync(obj);

    const station = await stations.findOne({
      town: obj.town,
    });

    // station already exists
    if (station) {
      const error = new Error('station already exists');
      res.status(409); // conflict error
      return next(error);
    }

    const newuser = await stations.insert(obj);

    res.status(201).json(newuser);
  } catch (error) {
    next(error);
  }
});

/* Update a specific station */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await schema.validateAsync(obj);
    const station = await stations.findOne({
      _id: id,
    });
    // station does not exist
    if (!station) {
      return next();
    }

    const updatedStation = await stations.update({
      _id: id,
    }, { $set: result },
    { upsert: true });

    res.json(updatedStation);
  } catch (error) {
    next(error);
  }
});

/* Delete a specific station */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const station = await stations.findOne({
      _id: id,
    });

    // station does not exist
    if (!station) {
      return next();
    }
    await stations.remove({
      _id: id,
    });

    res.json({
      message: 'deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
