const database = require('../models');

class TurmasController {

    static async mostraTurmas(req, res) {
        try {
            const turmas = await database.Turmas.findAll();
            return res.status(200).json(turmas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraTurmaPorId(req, res) {
        const id = req.params.id;

        try {
            const turma = await database.Turmas.findOne({ where: { id: id } });
            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaTurma(req, res) {
        const dados = req.body;

        try {
            const novaTurma = await database.Turmas.create(dados);
            return res.status(201).json(novaTurma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaTurma(req, res) {
        const id = req.params.id;
        const dados = req.body;

        try {
            await database.Turmas.update(dados, { where: { id: id } });
            const turmaAtualizada = await database.Turmas.findOne({ where: { id: id } })
            return res.status(200).json(turmaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaTurma(req, res) {
        const id = req.params.id;

        try {
            await database.Turmas.destroy({ where: { id: id } });
            return res.status(200).json(`message: id ${id} deletado.`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


}

module.exports = TurmasController;  