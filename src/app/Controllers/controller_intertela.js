const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
   async listar_intertela(request, response, trs){
     
    const tip_material = "Intertela"
    const intertelas = await connection('tb_material')
           .where('nome', tip_material||"intertela")
           .select(   
              'tb_material.pk_id_material', 
              'tb_material.fk_id_referencia', 
              'tb_material.fk_id_cutsheet', 
              'tb_material.nome', 
              'tb_material.cor',            
              'tb_material.metragem', 
              'tb_material.bale_number', 
              'tb_material.estado_rolo',             
           );


           
    return response.json(intertelas);
    
   },


  async registar_intertela(request, response, trx){
  const {
    pk_id_material,
    fk_id_referencia,
    fk_id_cutsheet,
    fk_id_tamanho,
    nome,
    cor,
    metragem,
    bale_number,
    estado_rolo 
  } =  request.body;

    
  try {

    const material = await connection('tb_material')
                    .where({fk_id_referencia})
                    .andWhere({bale_number})
                    .andWhere({nome})
                    .first();

    if(material) return response.status(400).send({error: 'intertela Ja Registrado ja regitrada'}); 
    await connection.transaction(async trx => {
        const id_material= await connection('tb_material')

     await connection('tb_material')
     .insert({
      pk_id_material,
      fk_id_referencia,
      fk_id_cutsheet,
      fk_id_tamanho,
      nome,
      cor,
      metragem,
      bale_number,
      estado_rolo   })
     .transacting(trx);
    });
    return response.status(200).send({message: 'intertela Registrodo com Sucesso!'});
  } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+" "+err});
            }
    },

  
}
