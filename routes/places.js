const express = require('express');
const router = express.Router();

const {getPlaces, addPlace, deletePlace, editPlace}= require('../controllers/places');

router.route('/places').get(getPlaces).post(addPlace);
router.route('/places/:id').delete(deletePlace).patch(editPlace);

module.exports = router;