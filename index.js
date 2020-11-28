const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.status(200).send({message: 'Consulta exitosa.'})
});


app.listen(3000, () => {
    console.log('El servidor está escuchando en http://localhost:' + 3000);
});