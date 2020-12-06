const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/JWT');

const User = require('../models/user')

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        //Validar Email
        const userDB = await User.findOne({email});
        if (!userDB) {
            return res.status(404).json({
                msg: 'Email o Password incorrectos'
            });
        }
        //Verificar password
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(404).json({
                msg: 'Email o Password incorrectos'
            });
        }

        //Generar Token JWT
        const token = await generarJWT(userDB.id);;

        return res.status(200).json({
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contacte con el administrador'
        })
    }
};

module.exports = {
    login
};