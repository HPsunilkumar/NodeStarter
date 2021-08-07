var express = require('express');
var router = express.Router();
const userService = require('../service/userService');
const { asyncAuthRistrict } = require('../utills/asyncHandler');
const Events = require('../subscriptions');
// const ErrorDispatcher = require('../utills/error/errorDispatcher');

/* GET users listing. */
router.get('/', function(req, res) {
  // throw new ErrorDispatcher('something went wrong in user querry');
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/create', async function(req, res, next) {
  // const {
  //   type
  // } = req.body;
  try {
    const user = await userService.createUser({ ...req.body });
    res.send(user);
  }
  catch(err) {
    next(err);
  }
});

/* GET users listing. */
router.post('/login', async function(req, res, next) {
  const {
    email,
    password
  } = req.body;
  try {
    console.log('dispaching');
    Events.eventEmitter.emit('sendMail', { email });
    const user = await userService.userLogin({ email, password });
    res.send(user);
  }
  catch(err) {
    next(err);
  }
});

/* GET users listing. */
router.post('/profile', asyncAuthRistrict, async function(req, res, next) {
  const {
    email
  } = req.body;
  try {
    const user = await userService.emailExists(email);
    res.send(user);
  }
  catch(err) {
    next(err);
  }
});


module.exports = router;
