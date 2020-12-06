const express = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../midlewares/validarJWT');

//Controllers
const {getAlbum, getAlbumByID, saveAlbum, updateAlbum, deleteAlbum} = require('../controllers/album');
const {validarCampos} = require('../midlewares/validar-campos');

const router = express.Router();

router.get('/', validarJWT, getAlbum);
router.get('/:id', validarJWT, getAlbumByID);
router.post('/', validarJWT, 
[
    check('title', 'El campo title es obligatorio').not().isEmpty(),
    check('year', 'El campo year es obligatorio'),
    //check('artist': 'El artista es obligatorio'),
    //check('user', 'El usuario es obligatorio'),
    validarCampos,
],  
saveAlbum);
router.put('/:id', validarJWT, updateAlbum);
router.delete('/:id', validarJWT, deleteAlbum);

module.exports = router;