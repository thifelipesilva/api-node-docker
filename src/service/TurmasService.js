const db = require('../models');
const Service = require('./Service');

class TurmasService extends Service {
    constructor() {
        super('Turmas');
    }
}

module.exports = TurmasService;