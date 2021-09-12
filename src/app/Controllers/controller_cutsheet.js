const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
   async listar_cutsheet(request, response){
    const cutsheet = await connection('tb_cutsheet')
           .select('*');
    return response.json(cutsheet);
    
   },

  async registar_cutsheet(request, response, trx){
  const {
        codigo_cutsheet,
        cod_tecido1,
        cod_tecido2,
        cod_tecido3,       
        tipo_peca,
        quantidade_peca, 
        metragem_tecido,
        cod_intertela1,
        cod_intertela2,
        metragem_intertela,       
        cod_bolso1,
        cod_bolso2,       
        metragem_bolso,  
        tipo_etiqueta,     
        style,           
        nr_cortes,    
        cor,    
        butao,                   
        empacotamento,   
        quant_zipper,     
        hook_bar,            
        sticker_tipo,
        cod_cones   
  } =  request.body;

    
  try {
    await connection.transaction(
      async trx => {
        const id_cutsheet= await connection('tb_cutsheet')

     await connection('tb_cutsheet')
     .insert({
            codigo_cutsheet,
            cod_tecido1,
            cod_tecido2,
            cod_tecido3,       
            tipo_peca,
            quantidade_peca, 
            metragem_tecido,
            cod_intertela1,
            cod_intertela2,
            metragem_intertela,       
            cod_bolso1,
            cod_bolso2,       
            metragem_bolso,  
            tipo_etiqueta,     
            style,           
            nr_cortes,    
            cor,    
            butao,                   
            empacotamento,   
            quant_zipper,     
            hook_bar,            
            sticker_tipo,
            cod_cones   
        })
     .transacting(trx);
    });
    return response.status(200).send({message: 'Registro Efectuado com Sucesso!'});
  } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+" "+err});
            }
    },


    async deleteCutsheet(request, response){
      const {id} = request.params;

     const deletar = await connection('tb_cutsheet')
                      .where('pk_id_cutsheet', id)
                      .delete();
      
                      

        return response.status(204).send({message: 'Operacao Efectuada Com Sucesso'});   

  },
  
}
