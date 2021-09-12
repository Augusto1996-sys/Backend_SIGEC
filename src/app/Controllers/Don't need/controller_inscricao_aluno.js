const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
  async listar_inscricao_aluno(request, response){
   const listar_inscricao_alunos = await connection('tb_inscricao').select('*');
   return response.json(listar_inscricao_alunos);
  },

  
  async registar_inscricao_aluno(request, response){
  const {fk_id_turma, fk_id_classe, fk_id_aluno, ano_lectivo} = request.body;
       try {
            
            const id_inscricao = `${crypto.randomBytes(4).toString('Hex')}${fk_id_turma[0]}`.toLowerCase();
            const user = await connection('tb_inscricao')
                              .where({fk_id_aluno}).first();
            if(user) return response.status(400).send({error: 'verifica os Dados! Turma com o mesmo horario de entrada ja Alocada '});
            await connection('tb_inscricao').insert({
                id_inscricao,                     
                fk_id_turma, 
                fk_id_classe, 
                fk_id_aluno,                 
                ano_lectivo

            });
            const listar_inscricao_aluno_Registrada = await connection('tb_inscricao')
                                          .where({id_inscricao}).first();
           // listar_inscricao_aluno_Registrado.id_inscricao = undefined;
            return response.send({
              listar_inscricao_aluno_Registrada
            });
          } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+err});
            }
    },
  
}
