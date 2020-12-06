const jwt = require('jsonwebtoken')
const generarJWT = (UserID) => {
    return new Promise((resolve,reject) => {
        const payload = {
            UserID
        };

        try {
            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '12h'
            },(error, token) => {
                if (error) {
                    reject('Error al crear token');
                } else {
                    resolve(token);
                }
            })
        } catch (error) {
            console.log(error);
            reject('Error al crear token')

        }
    });
};

module.exports = {
    generarJWT,

}