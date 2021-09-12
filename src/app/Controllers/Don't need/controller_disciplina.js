const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
  async listar_disciplina(request, response){
   const disciplinas = await connection('tb_disciplina').select('*');
   return response.json(disciplinas);
   
  },


  async registar_disciplina(request, response){
  const {nome_disciplina, fk_id_classe} =  request.body;
       try {
            
             const user = await connection('tb_disciplina')
                              .where({nome_disciplina}).first();
            if(user) return response.status(400).send({error: 'verifica seus Dados! [Codigo ou Nome do disciplina] Dados ja cadastrados '});
            const id_disciplina = await connection('tb_disciplina').insert({
                nome_disciplina,                     
                fk_id_classe

            });
            const disciplina_Registrado = await connection('tb_disciplina')
                                          .where({id_disciplina}).first();
           // disciplina_Registrado.id_disciplina = undefined;
            return response.send({
              disciplina_Registrado
            });
          } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+err});
            }
    },
  
}
