const express = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../midlewares/validarJWT');

//Controllers
const { getUsers, getUser, saveUser, updateUser, deleteUser,  } = require('../controllers/user');
const { validarCampos } = require('../midlewares/validar-campos')

const router = express.Router();



router.get('/', validarJWT, getUsers);
router.get('/:id', validarJWT, getUser);
router.post('/', 
[
    validarJWT,
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('lastName', 'El campo lastName es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').isEmail(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos,
], 
saveUser);
router.put('/:id', 
    [
        validarJWT,
        check('name', 'El campo name es obligatorio').not().isEmpty(),
        check('lastName', 'El campo lastName es obligatorio').not().isEmpty(),
        check('email', 'El campo email es obligatorio').isEmail(),
        check('role', 'El campo role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    updateUser
);
router.delete('/:id', deleteUser);

module.exports = router;