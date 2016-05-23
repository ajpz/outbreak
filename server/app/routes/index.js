'use strict';

const router = require('express').Router();

router.use('/members', require('./members'));

router.use('/lobby', require('./lobby'));

router.use('/user', require('./user'));

router.use('/environment', require('./environment'));
// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
    res.status(404).end();
});

module.exports = router;
