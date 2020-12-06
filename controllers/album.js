const {response} = require('express');
const Album = require ('../models/album');

const getAlbum = async (req, res) => {
    try {
        const albumes = await Album.find();
        return res.status(200).json({
            albumes,
            AlbumID: req.AlbumID,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al consultar los albumes.'
        });
    }
};

const getAlbumByID = async (req, res) => {
    const AlbumID = req.params.id;
    try {
        const album = await Album.findById(AlbumID);
        if (!album){
            return res.status(404).json({
                msg: 'No existe album con ese ID.'
            })
        }
        return res.status(200).json({
            album
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al consultar el album.'
        })
    }
};

const saveAlbum = async (req, res) => {

    const body = req.body;
    const album = new Album(body);
    album.image = '';
    album.description = '';

    try {
        const albumSaved = await album.save();
        res.json({
            album: albumSaved
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al guardar album.'
        })
    }
};

const updateAlbum = async (req, res) => {
    const AlbumID = req.params.id;
    try {
        //Validar existencia del album.
        const albumDB = await Album.findById(AlbumID);
        if (!albumDB){
            return res.status(404).json({
                msg: 'No existe album con ese ID.'
            })
        }

        const {image, user, artist, ...campos } = req.body;

        const albumUpdated = await Album.findByIdAndUpdate(AlbumID, campos, {new: true});
        return res.status(200).json({
            msg: 'Album actualizado.',
            albumUpdated
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al actualizar album.'
        })
    }
};

const deleteAlbum = async (req, res = response) => {
    const AlbumID = req.params.id;
    try {
        //Validar existencia de album.
        const albumDB = await Album.findById(AlbumID);
        if (!albumDB){
            return res.status(404).json({
                msg: 'No existe album con ese ID.'
            })
        }
        await Album.findByIdAndDelete(AlbumID);
        return res.status(200).json({
            msg: 'Album eliminado.',
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al eliminar el album.'
        })
    }
}

module.exports = {
    getAlbum, getAlbumByID, saveAlbum, updateAlbum, deleteAlbum
}