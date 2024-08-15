// Importa el módulo de Express para crear y manejar el servidor
const express = require('express');
// Importa la función para conectar con la base de datos
const dbConnection = require('../database/config');
// Carga las variables de entorno desde un archivo .env
require('dotenv').config();

// Importa los controladores necesarios para manejar las rutas
const { getEmployee, postEmployee } = require('../Controllers/employeeController.js');

// Define la clase del servidor
class Server {
    constructor() {
        // Inicializa una instancia de Express
        this.app = express();
        // Define la ruta base para los empleados
        this.pathEmployee = '/api/employee';

        // Llama a los métodos para configurar el servidor
        this.listen();
        this.dbConnection();
        this.route();
    }

    // Método para conectar a la base de datos
    async dbConnection() {
        // Llama a la función de conexión a la base de datos
        await dbConnection();
    }

    // Método para configurar las rutas y middleware
    route() {
        // Usa el middleware para parsear el cuerpo de las solicitudes en formato JSON
        this.app.use(express.json());
        // Define la ruta GET para obtener todos los empleados
        this.app.get(this.pathEmployee, getEmployee);
        // Define la ruta POST para crear un nuevo empleado
        this.app.post(this.pathEmployee, postEmployee);
    }

    // Método para iniciar el servidor y escuchar en el puerto especificado
    listen() {
        // Escucha en el puerto definido en las variables de entorno
        this.app.listen(process.env.PORT, () => {
            // Imprime un mensaje en la consola indicando que el servidor está en funcionamiento
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
}

// Exporta la clase Server para que pueda ser utilizada en otras partes de la aplicación
module.exports = Server;
