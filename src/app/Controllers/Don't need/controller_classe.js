const express = require('express');
const connection = require('../../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
  async listar_classe(request, response){
   const classes = await connection('tb_classe').select('*');
   return response.json(classes);
   
  },



  async registar_classe(request, response){
  const {nome_classe } =  request.body;
       try {
        
            const claase = await connection('tb_classe')
                              .where({nome_classe}).first();
            if(claase) return response.status(400).send({error: 'Classe ja cadastrada '});
            await connection('tb_classe').insert({nome_classe});
            
            const classe_Registrada = await connection('tb_classe')
                                          .where({nome_classe}).first();
           // classe_Registrada.id_classe = undefined;
            return response.send({
              classe_Registrada
            });
          } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+" "+err});
            }
    },

  
}
