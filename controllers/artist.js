const {response} = require('express');
const Artist = require('../models/artist');

const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.status(200).json({
            artists
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al consultar artistas'
        });
    }
};

const getArtistByID = async (req, res) => {
    const artistID = req.params.id;
    try {
        //Validar si existe el artist.
        const artist = await Artist.findById(artistID);
        if (!artist){
            return res.status(404).json({
                msg: 'No existe artista con ese ID.'
            });
        }
        return res.status(200).json({
            artist
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al consultar artista.'
        });
    }
};

const saveArtist = async (req, res) => {
    const body = req.body;
    const artist = new Artist(body);
    artist.description = '';
    artist.image = '';
    try {
        const artistSaved = await artist.save();
        res.json({
            artist: artistSaved
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al guardar artista.'
        });
    }
};

const updateArtist = async (req, res) => {
    const artistID = req.params.id;
    try {
        //Validar existencia del artista.
        const artistDB = await Artist.findById(artistID);
        if (!artistDB){
            return res.status(404).json({
                msg: 'No existe artista con ese ID.'
            });
        }

        const {image, user, ...campos} = req.body;

        const artistUpdated = await Artist.findByIdAndUpdate(artistID, campos, {new: true});
        return res.status(200).json({
            msg: 'Artista actualizado.',
            artistUpdated
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al actualizar el artista.'
        });
    }
};

const deleteArtist = async (req, res = response) => {
    const artistID = req.params.id;
    try {
        //Validar existencia del artista
        const artistDB = await Artist.findById(artistID);
        if (!artistDB){
            return res.status(400).json({
                msg: 'No existe artista con ese ID.'
            });
        }
        await Artist.findByIdAndDelete(artistID);
        return res.status(200).json({
            msg: 'Artista eliminado.'
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al eliminar artista.'
        });
    }
};

module.exports = {
    getArtists, getArtistByID, saveArtist, updateArtist, deleteArtist,
}
