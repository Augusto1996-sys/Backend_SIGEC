const express = require('express');
const connection = require('../../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
  async listar_turma(request, response){
   const turmas = await connection('tb_turma').select('*');
   return response.json(turmas);
   
  },



  async registar_turma(request, response){
  const {nome_turma, ano_lectivo, detalhes} =  request.body;
       try {
            
            const turma = await connection('tb_turma')
                              .where({nome_turma}).first();
            if(turma) return response.status(400).send({error: 'verifica seus Dados! Codigo ou Nome da turma ja cadastrados '});
            await connection('tb_turma').insert({
                nome_turma,                     
                ano_lectivo,
                detalhes

            });
            const turma_Registrada = await connection('tb_turma')
                                          .where({nome_turma}).first();
           // turma_Registrada.id_turma = undefined;
            return response.send({
              turma_Registrada
            });
          } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+err});
            }
    },

  
}
