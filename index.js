const express = require('express');
const {dbConnection} = require('./db/dbConnect');
const cors = require ('cors');
const bodyParser = require ('body-parser');
require('dotenv').config();

//Rutas
const routeUser = require('./routes/user');
const routeArtist = require('./routes/artist');
const routeAlbum = require('./routes/album');
const routeSong = require('./routes/song');
const routeAuth = require('./routes/auth');


const app = express();

//Configurar Cors
app.use(cors());
app.use(bodyParser.json());


//Use routes
app.use('/api/user', routeUser);
app.use('/api/artist', routeArtist);
app.use('/api/album', routeAlbum);
app.use('/api/song', routeSong);
app.use('/api/login', routeAuth);


//Base de datos
dbConnection();

app.get('/', (req, res) => {
    return res.status(200)
    .json({message: 'Consulta exitosa.'})
});


app.listen(process.env.PORT, () => {
    console.log('El servidor está escuchando en http://localhost:' + process.env.PORT);
});