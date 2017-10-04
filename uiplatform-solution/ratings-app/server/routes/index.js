const express = require('express');
const router = express.Router();

const movies = require('../movies');
const server = require('../server');

router.get('/', server);

module.exports = router;
