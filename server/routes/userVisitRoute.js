const express = require('express');
const { increaseVisit, getVisitCount } = require('../controllers/userVisitController');
const router = express.Router()

router.post("/", increaseVisit);
router.get("/total-visits", getVisitCount);

module.exports = router