const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
  async listar_tipo_usuario(request, response){
   const tipo_usuario = await connection('tb_tipo_usuario').select('*');
   return response.json(tipo_usuario);
   
  },

  async registar_tipo_usuario(request, response, trx){
  const {tipo_usuario,detalhes} =  request.body;
       try {
            
            const tipo_usuarioa = await connection('tb_tipo_usuario') .where({tipo_usuario}).first();
            if(tipo_usuarioa) return response.status(400).send({error: 'verifica seus Dados! Tipo de Usuario ja cadastrados '});
              await connection.transaction(async trx => {
              const fk_tipo_usuario = 
              await connection('tb_tipo_usuario')
              .insert({tipo_usuario,funcao}, 'fk_tipo_usuario').transacting(trx);
             await connection('tb_tipo_usuario_funcao')
             .insert({fk_tipo_usuario:fk_tipo_usuario[0]}, 'fk_tipo_usuario')
             .transacting(trx);
            });
            return response.status(200).send({message: 'Tipo de Usuario Registrado com sucesso'});

          } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Try Again '+err});
            }
    },

  
}
