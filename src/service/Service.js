const db = require('../models');

class Service {
    constructor(modelo) {
        this.modelo = modelo;
    }

    async mostraTodosRegistros(where = {}) {
        return db[this.modelo].findAll({ where: { ...where } });
    }

    async mostraRegistroPorId(where = {}) {
        return db[this.modelo].findOne({ where: { ...where } });
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

    async deletaRegistro(where = {}) {
        return db[this.modelo].destroy({ where: { ...where } });
    }

    async consultaRegistroApagado(id) {
        return db[this.modelo]
          .findOne({ paranoid: false, where: { id: id } });
      }

    async restauraRegistro(id) {
        return db[this.modelo].restore({ where: { id } });
    }

    async encontraEContraRegistro(where = {}, agregadores) {
        return db[this.modelo].findAndCountAll({ where: { ...where }}, ...agregadores);
    }
}

module.exports = Service;

