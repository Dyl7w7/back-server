const express = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../midlewares/validarJWT');

const {getArtists, getArtistByID, saveArtist, updateArtist, deleteArtist,} = require('../controllers/artist');
const {validarCampos} = require('../midlewares/validar-campos');

const router = express.Router();

router.get('/', validarJWT, getArtists);
router.get('/:id', validarJWT, getArtistByID);
router.post('/', 
[
    validarJWT,
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    //check('user', 'El usuario es obligatorio').not().isEmpty(),
    validarCampos
],
saveArtist);
router.put('/:id', validarJWT, 

updateArtist, );
router.delete('/:id', validarJWT, deleteArtist);

module.exports = router;