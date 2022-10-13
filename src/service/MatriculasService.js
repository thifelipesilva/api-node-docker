const db = require('../models');
const Service = require('./Service');

class MatriculasService extends Service {
    constructor() {
        super('Matriculas');
    }
}

module.exports = MatriculasService;