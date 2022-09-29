const database = require('../models');

class PessoasController {
    
    static async mostraPessoas(req, res) {

        try {
            const pessoas = await database.Pessoa.findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }    
    }

    static async criaPessoa(req, res) {
        const dadosPessoa = req.body;

        try {
            const pessoaCriada = await database.Pessoa.create(dadosPessoa);
            return res.status(201).json(pessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraUmaPessoa(req, res) {
        const { id } = req.params;

        try {
            const umaPessoa = await database.Pessoa.findOne({ where: { id: id } });
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req, res) {
        const dadosAtualizados = req.body;
        const { id } = req.params;

        try {
            await database.Pessoa.update(dadosAtualizados, { where: { id } });
            const pessoa = await database.Pessoa.findOne({ where: { id } })
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        
        try {
            await database.Pessoa.destroy({ where: { id } });
            return res.status(200).json({ message: `Id ${id} apagado.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoasController;