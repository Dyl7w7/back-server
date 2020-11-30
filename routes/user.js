const express = require('express');
const { getUsers, saveUser } = require('../controllers/user');

const router = express.Router();



router.get('/', getUsers);
router.post('/', saveUser);
module.exports = router;