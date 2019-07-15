const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route    GET api/auth
// @desc     Gets logged user
// @access   Private
router.get('/', auth, async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // do not return password
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
  return res.send('Get logged in user');
});

// @route    POST api/auth
// @desc     Authorizes user and returns token
// @access   Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) return res.status(400).json({msg: 'Invalid credentials'});

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      res.json({token})
    });

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }

});

module.exports = router;
