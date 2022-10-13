const db = require('../models');
const Service = require('./Service');

class PessoasService extends Service {
    constructor() {
        super('Pessoas');
        this.matriculas = new Service('Matriculas');
      
    }

    async mostraTodosRegistrosAtivos(where = {}) {
        return db.Pessoas.findAll({ where: { ...where } });
    }

    async mostraTodosRegistros(where = {}) {
        return db.Pessoas
            .scope('todasOsRegistros')
            .findAll({ where: { ...where } });
    }

    async cancelaPessoaEMatricula(estudanteId) {
        return db.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ ativo: false }, estudanteId, { transaction: transacao });
            await this.matriculas.atualizaVariosRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction: transacao })
        });
    }

    async matriculaPorEstudante(where = {}) {
        const matriculas = await db.Pessoas.findOne({ where: { ...where } });
        const todasMatriculas = await matriculas.getAulasMatriculadas();
        return todasMatriculas;
        
    }
}

module.exports = PessoasService;