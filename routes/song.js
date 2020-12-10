const express = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../midlewares/validarJWT');

//Controllers
const {getSong, getSongByID, saveSong, updateSong, deleteSong} = require('../controllers/song');
const {validarCampos} = require('../midlewares/validar-campos');

const router = express.Router();

router.get('/', validarJWT, getSong);
router.get('/:id', validarJWT, getSongByID);
router.post('/', validarJWT, 
[
    check('number', 'El campo number es obligatorio').not().isEmpty(),
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    //check('artist', 'El artista es obligatorio')
    validarCampos
],
saveSong);
router.put('/:id', validarJWT, updateSong);
router.delete('/:id', validarJWT, deleteSong);

module.exports = router;