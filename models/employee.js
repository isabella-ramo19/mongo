const { Schema, model } = require('mongoose');

const EmployeeSchema = Schema({
    number_document: {
        type: Number,
        required: [true, "The document number is required"],
        minLength: [6, "Min 6 characters"],
        trim: true,
        uppercase: true
    },
    name: {
        type: String,
        required: [true, "The name is incorrect"],
    },
    entryDate: {
        type: Date,
        required: [true, "The entry date is required"],
    },
    withdrawalDate: {
        type: Date,
        default: null,
    },
    salary: {
        type: Number,
        required: [true, "The salary is required"],
        min: [0, "The salary must be greater than 0"],
    },
    laboredDays: {
        type: Number,
        required: [true, "The labored days are required"],
        min: [0, "The labored days must be greater than 0"],
    },
    severance: {
        type: Number,
        required: [true, "The severance is required"],
        min: [0, "The severance must be greater than 0"],
    },
    layoff: {
        type: Boolean,
        default: false,
    }
});

module.exports = model('Employee', EmployeeSchema, 'employees');
