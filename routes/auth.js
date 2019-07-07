const express = require('express');
const router = express.Router();

// @route    GET api/auth
// @desc     Gets logged user
// @access   Private
router.get('/', (req, res) => {
  return res.send('Get logged in user');
});

// @route    POST api/auth
// @desc     Authorizes user and returns token
// @access   Public
router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
