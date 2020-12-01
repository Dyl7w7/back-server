const express = require('express');
const { check } = require('express-validator');

//Controllers
const { getUsers, saveUser } = require('../controllers/user');
const { validarCampos } = require('../midlewares/validar-campos')

const router = express.Router();



router.get('/', getUsers);
router.post('/', 
[
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('lastName', 'El campo lastName es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').isEmail(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos,
], 
saveUser);
module.exports = router;