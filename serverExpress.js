const express = require('express');
const jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = 3000;
//PUERTO DE SALIDA
app.listen(PORT, () => {
    console.log(`Servidor http://localhost:${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public'))); FUE LLAMADA ASSETS
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/frontend", express.static(__dirname + "assets/js/"));

//RUTA POR HTML INICIAL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
//RUTA AL CARGAR IMG
//app.get('/cargar', async (req, res) => {
app.post('/cargar', async (req, res) => {
    try {
        const imageUrl = req.body.imageUrl;

        if (!imageUrl) {
            return res.status(400).send('Debes ingresar una URL valida.');
        }

        const image = await jimp.read(imageUrl);
        // PASA LA IMAGEN A ESCALA DE GRISES CON UN TAMAÑO DE 350 PX
        image.grayscale().resize(350, jimp.AUTO);

        // GUARDA LA IMAGEN QUE FUE CONVERTIDA
        // Genera un nombre de archivo único con los primeros 8 caracteres del UUID para la imagen procesada
        let uuid = uuidv4();
        uuid = uuid.slice(0,6); 
        outputFileName = `${uuid}.jpeg`; 
        console.log("outputFileName",outputFileName);

        const outputPath = path.join(__dirname, 'assets', 'img', outputFileName); // Ruta de salida para guardar la imagen procesada

        await image.writeAsync(outputPath); // Guarda la imagen procesada en la carpeta 'assets/img'

        // Envía la imagen procesada al cliente
        res.sendFile(outputPath);
        // EN CASO DE ERRORESS
    } catch (error) {
        console.error('Error al procesar la imagen:', error);
        res.status(500).send('Ocurrió un error al procesar la imagen.');
    }
});

//URL PARA PROBAR
// https://www.paisajesbonitos.org/wp-content/uploads/2019/03/paisajes-bonitos-flores-girasol.jpg
// https://www.paisajesbonitos.org/wp-content/uploads/2019/03/paisajes-bonitos-flores-margaritas.jpg
// https://www.paisajesbonitos.org/wp-content/uploads/2019/03/paisajes-bonitos-flores-tulipanes.jpg
// https://www.paisajesbonitos.org/wp-content/uploads/2019/02/paisajes-bonitos-playas-exoticas.jpg
// https://www.paisajesbonitos.org/wp-content/uploads/2019/02/paisajes-bonitos-playas-maldivas.jpg


