const db = require('../models');

class Service {
    constructor(modelo) {
        this.modelo = modelo;
    }

    async mostraTodosRegistros() {
        return db[this.modelo].findAll();
    }

    async mostraRegistroPorId(id) {
        return db[this.modelo].findOne({ where: { id } });
    }

    async criaRegistro(dados) {
        return db[this.modelo].create(dados)
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return db[this.modelo]
            .update(dadosAtualizados, {where: { id: id } }, transacao);
    }

    async atualizaVariosRegistros(dadosAtualizados, where, transacao = {}) {
        return db[this.modelo]
            .update(dadosAtualizados, { where: { ...where } }, transacao);

    }

    async deletaRegistro(id) {
        return db[this.modelo].destroy({ where: { id: id } });
    }

    async restauraRegistro(id) {
        return db[this.modelo].restore({ where: { id } });
    }
}

module.exports = Service;