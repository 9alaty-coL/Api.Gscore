const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController')

router.get('/standing/:leagueId', homeController.leaderBoard)

router.get('/', homeController.home)

module.exports = router

