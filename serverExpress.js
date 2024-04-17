const express = require('express');
const jimp = require('jimp');
const { v4: uuidv4 } = require('uuid'); // Importa la función uuidv4 de la biblioteca uuid
const path = require('path'); // Importa el módulo path para manejar rutas de archivos

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor http://localhost:${PORT}`); // Imprime el puerto en el que el servidor está corriendo
});


app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public'))); FUE LLAMADA ASSETS
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/frontend", express.static(__dirname + "assets/js/"));

//RUTA POR HTML INICIAL



// Ruta para la página inicial que contiene el formulario para cargar la imagen

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Envía el archivo index.html al cliente
});

// Ruta para procesar la imagen enviada desde el formulario
app.post('/cargar', async (req, res) => {
    try {

        const imageUrl = req.body.imageUrl; // Obtiene la URL de la imagen desde el cuerpo de la solicitud

        if (!imageUrl) {
            return res.status(400).send('Debes ingresar una URL válida.'); // Verifica si se proporcionó una URL válida
        }

        const image = await jimp.read(imageUrl); // Lee la imagen desde la URL
        image.grayscale().resize(350, jimp.AUTO); // Convierte la imagen a escala de grises y la redimensiona


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
        console.error('Error al procesar la imagen:', error); // Maneja errores durante el procesamiento de la imagen
        res.status(500).send('Ocurrió un error al procesar la imagen.'); // Envía un mensaje de error al cliente
    }
});


//URL PARA PROBAR
// https://www.paisajesbonitos.org/wp-content/uploads/2019/03/paisajes-bonitos-flores-girasol.jpg
// https://www.paisajesbonitos.org/wp-content/uploads/2019/03/paisajes-bonitos-flores-margaritas.jpg
// https://www.paisajesbonitos.org/wp-content/uploads/2019/03/paisajes-bonitos-flores-tulipanes.jpg
// https://www.paisajesbonitos.org/wp-content/uploads/2019/02/paisajes-bonitos-playas-exoticas.jpg
// https://www.paisajesbonitos.org/wp-content/uploads/2019/02/paisajes-bonitos-playas-maldivas.jpg


