const express = require('express');
const connection = require('../../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
  async listar_alocacao_turma(request, response){
   const alocacao_turmas = await connection('tb_alocacao_turma').select('*');
   return response.json(alocacao_turmas);
  },


  async registar_alocacao_turma(request, response){
  const {fk_id_turma, fk_id_sala, ano_lectivo, hora_entrada, hora_saida} =  request.body;
       try {
            
            const user = await connection('tb_alocacao_turma')
                              .where({hora_entrada}).first();
            if(user) return response.status(400).send({error: 'Turma com o mesmo horario de entrada ja Alocada a mesma sala de aulas no mesmo horario '});
            const id_alocacao_turma =  await connection('tb_alocacao_turma').insert({                    
                fk_id_turma, 
                fk_id_sala, 
                ano_lectivo, 
                hora_entrada, 
                hora_saida

            });
            const alocacao_turma_Registrada = await connection('tb_alocacao_turma')
                                          .where({id_alocacao_turma}).first();
           // alocacao_turma_Registrado.id_alocacao_turma = undefined;
            return response.send({
              alocacao_turma_Registrada
            });
          } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+err});
            }
    },
  
}
