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

module.exports = {
    getUsers, saveUser
}