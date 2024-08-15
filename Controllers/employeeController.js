// Importa el modelo de empleado desde el archivo especificado
const Employee = require('../models/employee.js');

// Obtener todos los documentos de empleados
const getEmployee = async (req, res) => {
    try {
        // Busca todos los documentos en la colección de empleados
        const employees = await Employee.find();
        // Envía la lista de empleados como respuesta en formato JSON
        res.json(employees);
    } catch (error) {
        // Si ocurre un error, responde con un código de estado 500 y un mensaje de error
        res.status(500).json({ msg: 'Error retrieving employees' });
    }
};

// Crear un nuevo empleado
const postEmployee = async (req, res) => {
    // Extrae el cuerpo de la solicitud
    const body = req.body;
    let msg = 'Employee inserted successfully';

    try {
        // Convierte la fecha de entrada y la fecha de retiro (o usa la fecha actual si no se proporciona) a objetos Date
        const entryDate = new Date(body.entryDate);
        const withdrawalDate = body.withdrawalDate ? new Date(body.withdrawalDate) : new Date();
        
        // Calcula los días laborados como la diferencia entre las fechas de retiro y entrada, en días
        const laboredDays = Math.ceil((withdrawalDate - entryDate) / (1000 * 60 * 60 * 24));

        // Calcula las cesantías como una proporción del salario basado en los días laborados
        const severance = (body.salary * laboredDays) / 365;

        // Asigna los días laborados y las cesantías al cuerpo de la solicitud
        body.laboredDays = laboredDays;
        body.severance = severance;

        // Crea una nueva instancia del modelo de empleado con los datos del cuerpo de la solicitud
        const employee = new Employee(body);
        // Guarda el nuevo empleado en la base de datos
        await employee.save();
    } catch (error) {
        // Si ocurre un error, actualiza el mensaje y responde con un código de estado 500 y un mensaje de error
        msg = 'Employee not inserted';
        return res.status(500).json({ msg: msg, error: error.message });
    }

    // Envía una respuesta indicando que el empleado fue insertado correctamente
    res.json({ msg: msg });
};

// Exporta las funciones para que puedan ser utilizadas en otras partes de la aplicación
module.exports = {
    getEmployee,
    postEmployee
};
