const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { TurmasService } = require('../service')
const turmasService = new TurmasService();

class TurmasController {

    static async mostraTurmas(req, res) {

        const { data_inicial, data_final } = req.query;
        const where = {};

        data_inicial || data_final ? where.data_inicio = {} : null;
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
        data_final ? where.data_inicio[Op.lte] = data_final : null;

        try {
            const turmas = await turmasService.mostraTodosRegistros(where);
            return res.status(200).json(turmas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraTurmaPorId(req, res) {

        const { id } = req.params;

        try {
            const turma = await turmasService.mostraRegistroPorId(id);
            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaTurma(req, res) {
        const dados = req.body;

        try {
            const novaTurma = await turmasService.criaRegistro(dados);
            return res.status(201).json(novaTurma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params;
        const dados = req.body;

        try {
            await turmasService.atualizaRegistro(dados, id);
            const turmaAtualizada = await turmasService.mostraRegistroPorId(id)
            return res.status(200).json(turmaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaTurma(req, res) {
        const { id } = req.params;

        try {
            await turmasService.deletaRegistro({ id });
            return res.status(200).json(`message: id ${id} deletado.`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


}

module.exports = TurmasController;  