const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next) => {
    //Leer token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const {UserID} = jwt.verify(token, process.env.JWT_SECRET);
        req.UserID = UserID;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: 'Token no es válido'
        });
    }
};

module.exports = {
    validarJWT,
};