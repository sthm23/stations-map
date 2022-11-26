/* eslint-disable consistent-return */
const express = require('express');
const schema = require('../db/schemaForRegions');
const db = require('../db/connection');

const regions = db.get('regions');

const router = express.Router();

/* Get all regions */
router.get('/', async (req, res, next) => {
  try {
    const allRegions = await regions.find({});
    const result = allRegions.map(item=>item.map_in);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/* Get one region */
router.get('/:region_id', async (req, res, next) => {
  try {
    const { region_id } = req.params;
    const region = await regions.findOne({
      id: +region_id,
    });

    if (!region) {
      const error = new Error('region does not exist');
      return next(error);
    }
    const result = region.map_in
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/* get region's districts */
router.post('/:region_id', async (req, res, next) => {
  try {
    const obj = req.body;
    const {region_id} = req.params;
    await schema.validateAsync(obj);

    const region = await regions.findOne({
      id: +region_id,
    });

    // region not fount;
    if (!region) {
      const error = new Error('region not found');
      return next(error);
    }

    const result = region.regions
          .filter(item=> obj.dist.some(el=> +el === +item.id))
            .map(reg=>reg.map_in);
    if(result.length !== 0){
      res.json(result)
    } else {
      const error = new Error('dist not found');
      next(error);
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;
