const { PessoasService } = require('../service');
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
            const umaPessoa = await pessoasService.mostraRegistroPorId({ id });
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
            await pessoasService.deletaRegistro({ id });
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
    

    static async cancelaMatriculasPessoa(req, res) {
        const { estudanteId } = req.params;
       
        try {
            await pessoasService.cancelaPessoaEMatricula(estudanteId);
            return res.status(200).json({ message: `matriculas do estudante ${estudanteId} foram canceladas`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async mostraMatriculasEstudante(req, res) {
        const { estudanteId } = req.params;
        try {
            const matriculas = await pessoasService.matriculaPorEstudante({ id: estudanteId });
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    
}

module.exports = PessoasController;