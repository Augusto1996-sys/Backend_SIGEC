const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
   async listar_requisicao(request, response){
    const requisicao = await connection('tb_requisicao')
           .select('*');
    return response.json(requisicao);
    
   },

  async registar_requisicao(request, response){
  const {                  
         recolha,                   
         cordenador,
         fielarmazem,
         fk_id_estado_requisicao 
  } =  request.body;

    
  try {
    await connection.transaction(
      async trx => {
        const id_requisicao= await connection('tb_requisicao')

     await connection('tb_requisicao')
     .insert({
              recolha,                   
              cordenador,
              fielarmazem,
              fk_id_estado_requisicao   
        })
     .transacting(trx);
    });
    return response.status(200).send({message: 'Registro Efectuado com Sucesso!'});
  } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+" "+err});
            }
    },


    async deleterequisicao(request, response){
      const {id} = request.params;

     const deletar = await connection('tb_requisicao')
                      .where('pk_id_requisicao', id)
                      .delete();
      
                      

        return response.status(204).send({message: 'Operacao Efectuada Com Sucesso'});   

  },
  
}
