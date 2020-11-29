const express = require('express');
const {dbConnection} = require('./db/dbConnect');
const cors = require ('cors');
const bodyParser = require ('body-parser');

//Rutas
const routeUser = require('./routes/user');

const app = express();

//Configurar Cors
app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', routeUser);

//Base de datos
dbConnection();

app.get('/', (req, res) => {
    return res.status(200)
    .json({message: 'Consulta exitosa.'})
});


app.listen(3000, () => {
    console.log('El servidor está escuchando en http://localhost:' + 3000);
});