const { NiveisService } = require('../service');
const niveisService = new NiveisService();

class NiveisController {
    
    static async mostraNiveis(req, res) {
        try {
            const niveis = await niveisService.mostraTodosRegistros();
            return res.status(200).json(niveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraNivelPorId(req, res) {
        const { id } = req.params;
        try {
            const nivel = await niveisService.mostraRegistroPorId({ id });
            return res.status(200).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaNivel(req, res) {
        const dados = req.body;
        try {
            const nivel = await niveisService.criaRegistro(dados);
            return res.status(201).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaNivel(req, res) {
        const { id } = req.params;
        const dados = req.body;

        try {
            await niveisService.atualizaRegistro(dados, id);
            const nivelAtualizado = await niveisService.mostraRegistroPorId(id);
            return res.status(200).json(nivelAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaNivel(req, res) {
        const { id } = req.params;

        try {
            await niveisService.deletaRegistro({ id });
            return res.status(200).json(`message: id ${id} deletado.`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NiveisController;