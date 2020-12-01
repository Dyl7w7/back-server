const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    try {
        const users = await User.find();
        return res.status(200)
            .json({
                users
            });
    } catch (error) {
        return res.status(400)
            .json({
                msg: 'Error al consultar los usuarios.'
            });
    }
};

const getUser = async (req, res) => {

    const uid = req.params.id;
    try {
        //Validar si existe user
        const user = await User.findById(uid);
        if (!user){
            return res.status(404).json({
                msg: 'No existe usuario con ese ID.'
            });
        }

        return res.status(200)
            .json({
                user
            });
    } catch (error) {
        console.log(error);
        return res.status(400)
            .json({
                msg: 'Error al consultar el usuario.'
            });
    }
};


const saveUser = async (req, res) => {


    const body = req.body;
    const user = new User(body);
    user.role = 'USER_ROLE';
    user.image = '';

    try {


        //Validar Email
        const emailVal = await User.findOne({ email: body.email});
        if (emailVal) {
            return res.status(400).json({
                msg: 'El correo ya está registrado'
            });
        };

        //Encriptar Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(body.password, salt);

        //Guarda User
        const userSaved = await user.save();
        res.json({
            user: userSaved
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error al guardar el usuario'
        });
    }
};

const updateUser = async (req, res) => {

    const uid = req.params.id;
    try {

        //Validar existencia de User
        const usuarioDB = await User.findById( uid );
        if ( !usuarioDB ){
            return res.status(404).json({
                msg: 'No existe usuario con ese ID'
            });
        }

        const { password, image, ...campos } = req.body;
        
        const userUpdated = await User.findByIdAndUpdate( uid, campos, {new: true} );

        return res.status(200).json({
            msg: 'Usuario actualizado',
            userUpdated
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Contacta con el Administrador'
        })
        
    };
};

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;
    try {

        //Validar existencia de User
        const usuarioDB = await User.findById( uid );
        if ( !usuarioDB ){
            return res.status(404).json({
                msg: 'No existe usuario con ese ID'
            });
        }

        await User.findByIdAndDelete(uid);

        return res.status(200).json({
            msg: 'Usuario eliminado exitosamente',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contacta con el Administrador'
        });
    }
};
module.exports = {
    getUsers, saveUser, updateUser, deleteUser, getUser,
}