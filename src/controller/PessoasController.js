const { PessoasService } = require('../service');

const database = require('../models');
const Sequelize = require('sequelize');

const pessoasService = new PessoasService();

class PessoasController {
    
    static async mostraPessoasAtivas(req, res) {

        try {
            const pessoasAtivas = await pessoasService.mostraTodosRegistrosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }    
    }

    static async mostraTodasPessoas(req, res) {

        try {
            const pessoas = await pessoasService.mostraTodosRegistros();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }    
    }

    static async criaPessoa(req, res) {
        const dadosPessoa = req.body;

        try {
            const pessoaCriada = await pessoasService.criaRegistro(dadosPessoa);
            return res.status(201).json(pessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraUmaPessoa(req, res) {
        const { id } = req.params;

        try {
            const umaPessoa = await pessoasService.mostraRegistroPorId(id);
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req, res) {
        const dadosAtualizados = req.body;
        const { id } = req.params;

        try {
            await pessoasService.atualizaRegistro(dadosAtualizados, id);
            const pessoa = await pessoasService.mostraRegistroPorId(id)
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        
        try {
            await pessoasService.deletaRegistro(id);
            return res.status(200).json({ message: `Id ${id} apagado.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraRegistro(req, res) {
        const { id } = req.params;

        try {
            await pessoasService.restauraRegistro(id);
            return res.status(200).json({ message: `Id ${id} restaurado.` })
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


    static async mostraMatriculasEstudante(req, res) {
        const { estudanteId } = req.params;
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: estudanteId } });
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraMatriculasPorTurma(req, res) {
        const { turmaId } = req.params;
        
        try {
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: { 
                    turma_id: turmaId,
                    status: 'confirmado'
                },
                limit: 20
            });
            return res.status(200).json(todasAsMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraTurmasLotadas(req, res) {
        const lotacaoTurma = 2;       
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: { 
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            });
            return res.status(200).json(turmasLotadas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaMatriculasPessoa(req, res) {
        const { estudanteId } = req.params;
       
        try {
            await pessoasService.cancelaPessoaEMatricula(estudanteId);
            return res.status(200).json({ message: `matriculas do estudante ${estudanteId} foram canceladas`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    
}

module.exports = PessoasController;