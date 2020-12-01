const express = require('express');
const {dbConnection} = require('./db/dbConnect');
const cors = require ('cors');
const bodyParser = require ('body-parser');

//Rutas
const routeUser = require('./routes/user');
//const routeArtist = require('./routes/artist');

const app = express();

//Configurar Cors
app.use(cors());
app.use(bodyParser.json());

//Use routes
app.use('/api/user', routeUser);
//app.use('/api/artist', routeArtist );

//Base de datos
dbConnection();

app.get('/', (req, res) => {
    return res.status(200)
    .json({message: 'Consulta exitosa.'})
});


app.listen(3000, () => {
    console.log('El servidor está escuchando en http://localhost:' + 3000);
});