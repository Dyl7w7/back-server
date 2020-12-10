const {response} = require('express');
const song = require('../models/song');
const Song = require('../models/song');

const getSong = async (req, res) => {
    try {
        const songs = await Song.find();
        return res.status(200).json({
            songs,
            SongID: req.SongID
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al consultar las songs.'
        })
    }
};

const getSongByID = async (req, res) => {
    const SongID = req.params.id;
    try {
        //Validar existencia del song.
        const songDB = await Song.findById(SongID);
        if (!songDB){
            return res.status(404).json({
                msg: 'No existe song con ese ID.'
            })
        }
        return res.status(200).json({
            songDB
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al consultar song.'
        })
    }
};

const saveSong = async (req, res) => {

    const body = req.body;
    const song = new Song(body);
    song.duration = '00:00';
    song.file = '';
    try {
        const songSaved = await song.save();
        res.json({
            song: songSaved
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al guardar song'
        })
    }
};

const updateSong = async (req, res) => {
    const SongID = req.params.id;
    try {
        const songDB = await Song.findById(SongID);
        if (!songDB) {
            return res.status(400).json({
                msg: 'No existe song con ese ID.'
            });
        }
        const { file, number, ...campos } = req.body;

        const songUpdated = await Song.findByIdAndUpdate(SongID, campos, {new: true});
        return res.status(200).json({
            msg: 'Song actualizada',
            songUpdated
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al actualizar song.'
        })
    }
};

const deleteSong = async (req, res = response) => {
    const songID = req.params.id;
    try {
        const songDB = await Song.findById(songID);
        if (!songDB) {
            return res.status(404).json({
                msg: 'No existe song con ese ID.'
            });
        }
        await Song.findByIdAndDelete(songID);
        return res.status(200).json({
            msg: 'Song eliminado.'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error al eliminar el song.'
        })
    }
}
module.exports = {
    getSong, getSongByID, saveSong, updateSong, deleteSong,
};