'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middlewares/basic.js');
const { UserModel } = require('../models');

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body); // reads from the body of the request (Form-encoded data, username:username, password:password)
    let newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    console.error('Something is wrong in /signup', e);
    res.status(400).send('Bad Request');
  }
});

router.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;