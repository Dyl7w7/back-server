// api/auth
const express = require('express');
const { check } = require('express-validator');
const {login} = require('../controllers/auth');
const {validarCampos} = require('../midlewares/validar-campos');

const router = express.Router();

router.post('/', 
[
    check('email', 'El campo Email es obligatorio').not().isEmpty(),
    
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos,
],
login);

module.exports = router;