Rotas Pessoas

GET :
    /pessoas -> mostra todas pessoas.
    /pessoas/ativas -> mostra todas pessoas ativas.
    /pessoas/:id -> mostra pessoa pelo id.
    /pessoas/:estudanteId/matricula/:matriculaId -> mostra uma matricula de um estudante especifico.
    /pessoas/:estudanteId/matricula'-> mostra todas as matriculas de um estudante
    /pessoas/matricula/:turmaId/confirmadas -> mostra as matriculas confimadas de uma turma
    /pessoas/matricula/lotada -> mostra as turmas lotadas(matriculas)

POST:
    /pessoas -> cria um registro de uma pessoa.
    /pessoas/:estudanteId/matricula' -> cria matricula de um estudante.
    /pessoas/:id/restauraRegistro -> restaura um registro que sofreu uma soft delete
    /pessoas/:estudanteId/cancelamatricula -> muda o status da pessoa e cancela as matriculas

PUT: 
    /pessoas/:id -> atualiza um registro
    /pessoas/:estudanteId/matricula/:matriculaId -> atualiza uma matricula de um aluno

delete(soft delete): 
    /pessoas/:id -> deleta um registro
    /pessoas/:estudanteId/matricula/:matriculaId -> deleta uma matricula
    

rotas Niveis

GET:
    /niveis -> mostra os niveis das turmas.
    /niveis/:id -> mostra nivel por id.

POST :
    /niveis -> Cria um nivel.

PUT:
   /niveis/:id -> atualiza um nivel por id.

DELETE:
    /niveis/:id -> deleta um nivel por id.



rotas Turmas

GET:
    /turmas -> mostra as turmas(filtro por data).
    /turmas/:id -> mostra uma turma por id.

POST :
    /turmas -> Cria uma turma.

PUT:
   /turmas/:id -> atualiza uma turma por id.

DELETE:
    /turmas/:id -> deleta uma turma por id.