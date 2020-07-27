const express = require('express');
const router = express.Router();

const {getFoods, addFood, deleteFood, editFood} = require('../controllers/foods');

router.route('/foods').get(getFoods).post(addFood);
router.route('/foods/:id').delete(deleteFood).patch(editFood);

module.exports = router;