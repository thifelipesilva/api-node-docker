const database = require('../models');

class NiveisController {
    
    static async mostraNiveis(req, res) {
        try {
            const niveis = await database.Niveis.findAll();
            return res.status(200).json(niveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraNivelPorId(req, res) {
        const id = req.params.id;
        try {
            const nivel = await database.Niveis.findOne({ where: { id: id } });
            return res.status(200).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaNivel(req, res) {
        const dados = req.body;
        try {
            const nivel = await database.Niveis.create(dados);
            return res.status(201).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaNivel(req, res) {
        const id = req.params.id;
        const dados = req.body;

        try {
            await database.Niveis.update(dados, { where: { id } });
            const nivelAtualizado = await database.Niveis.findOne({ where: { id: id } });
            return res.status(200).json(nivelAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaNivel(req, res) {
        const id = req.params.id;

        try {
            await database.Niveis.destroy({ where: { id: id } });
            return res.status(200).json(`message: id ${id} deletado.`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NiveisController;