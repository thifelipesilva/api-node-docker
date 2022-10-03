const database = require('../models');

class PessoasController {
    
    static async mostraPessoas(req, res) {

        try {
            const pessoas = await database.Pessoas.findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }    
    }

    static async criaPessoa(req, res) {
        const dadosPessoa = req.body;

        try {
            const pessoaCriada = await database.Pessoas.create(dadosPessoa);
            return res.status(201).json(pessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraUmaPessoa(req, res) {
        const { id } = req.params;

        try {
            const umaPessoa = await database.Pessoas.findOne({ where: { id: id } });
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req, res) {
        const dadosAtualizados = req.body;
        const { id } = req.params;

        try {
            await database.Pessoas.update(dadosAtualizados, { where: { id } });
            const pessoa = await database.Pessoas.findOne({ where: { id } })
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        
        try {
            await database.Pessoas.destroy({ where: { id } });
            return res.status(200).json({ message: `Id ${id} apagado.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //Matriculas
    static async mostraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;

        try {
            const matricula = await database.Matriculas.findOne({
                where: { 
                    id: matriculaId, 
                    estudante_id: estudanteId 
                }
            });
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params;
        const dadosMatricula = { ...req.body, estudante_id: estudanteId };

        try {
            const matricula = await database.Matriculas.create(dadosMatricula);
            return res.status(201).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const dadosAtualizados = req.body;

        try {
            await database.Matriculas.update(dadosAtualizados, {
                where: { 
                    id: matriculaId, 
                    estudante_id: estudanteId 
                }
            });
            const matricula = await database.Matriculas.findOne({ where: { id: matriculaId } });
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;

        try {
            await database.Matriculas.destroy({
                where: { 
                    id: matriculaId, 
                    estudante_id: estudanteId 
                }
            });
            return res.status(200).json(`{ message: Matricula deletada }`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoasController;