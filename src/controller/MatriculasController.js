const database = require('../models');
const Sequelize = require('sequelize');

const { MatriculasService } = require('../service')
const matriculasServices = new MatriculasService();

class MatriculaController {
    
    //Matriculas
    static async mostraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;

        try {
            const matricula = await matriculasServices.mostraRegistroPorId({
                id: matriculaId,
                estudante_id: estudanteId
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
            const matricula = await matriculasServices.criaRegistro(dadosMatricula);
            return res.status(201).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const dadosAtualizados = req.body;

        try {
            await matriculasServices.atualizaVariosRegistros(dadosAtualizados, {
                id: matriculaId, 
                estudante_id: estudanteId
            });
            const matricula = await matriculasServices.mostraRegistroPorId({ id: matriculaId });
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;

        try {
            await matriculasServices.deletaRegistro({
                id: matriculaId, 
                estudante_id: estudanteId
            });
            return res.status(200).json(`{ message: Matricula deletada }`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    
    static async mostraMatriculasPorTurma(req, res) {
        const { turmaId } = req.params;
        
        try {
            const todasAsMatriculas = await matriculasServices.encontraEContraRegistro(
                { 
                    turma_id: turmaId,
                    status: 'confirmado'
                },
                { 
                    limit: 20,
                    order: [['estudante_id', 'DESC']]
                }
            );
            return res.status(200).json(todasAsMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraTurmasLotadas(req, res) {
        const lotacaoTurma = 2;       
        try {
            const turmasLotadas = await matriculasServices.encontraEContraRegistro(
                { 
                    status: 'confirmado'
                },
                {
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                }
            );
            return res.status(200).json(turmasLotadas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }



}

module.exports = MatriculaController;