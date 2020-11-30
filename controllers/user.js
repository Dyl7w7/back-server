const User = require('../models/user')

const getUsers = (req, res) => {


    User.find((err, users) => {
        if(!err) {
            return res.status(200)
            .json({
                users
            });
        } else {
            return res.status(200)
            .json({
                msg: 'Error al consultar los usuarios.'
            });
        } 
    });
};

const saveUser = (req, res) => {
    const body = req.body;
    const user = new User(body);
    user.role = 'USER_ROLE';
    user.image = '';

    user.save((err, userSaved) => {
        if (!err) {
            res.json({
                user: userSaved
            });
        } else {
            res.status(400).json({
                msg: 'Error al guardar el usuario'
            });
        }
    });
};

module.exports = {
    getUsers, saveUser
}