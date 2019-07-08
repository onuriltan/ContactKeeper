const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');


// @route    GET api/contacts
// @desc     Gets all users contacts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find( { user: req.user.id }).sort({ data: -1 }); // sort most recent date
    res.json(contacts)
  }catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post('/', [auth, [
  check('name', 'name is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name, email, phone, type, user: req.user.id
    });

    const contact = await newContact.save();
    res.json(contact);

  }catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }


});

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  let updatedContact = {};
  if(name) updatedContact.name = name;
  if(email) updatedContact.email = email;
  if(phone) updatedContact.phone = phone;
  if(type) updatedContact.type = type;
  
  try {
    let contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: updatedContact })
    res.json(contact)
  }catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }

});

// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', auth, async (req, res) => {

  let contact = await Contact.findById(req.params.id);
  if(!contact) return res.status(404).json({ msg: "Contact not found" });

  if(contact.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  Contact.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: contact.name+" removed" });

});

module.exports = router;
