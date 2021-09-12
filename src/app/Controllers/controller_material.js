const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
   async listar_material(request, response, trs){
    const material = await connection('tb_material')
          .where('fk_id_referencia', 23)
           .select(
            'tb_material.pk_id_material', 
            'tb_material.fk_id_cutsheet', 
            'tb_material.nome', 
            'tb_material.cor',            
            'tb_material.quantidade', 
            'tb_material.numero_buracos', 
            'tb_material.tipo', 
            'tb_material.tamanho', 
           );
    return response.json(material);
    
   },

  async registar_material(request, response, trx){
  const {
    pk_id_material,
    fk_id_referencia,
    fk_id_cutsheet,
    fk_id_tamanho,
    nome,
    quantidade,
    dimensao,
    cor,
    tipo,
    cod_cones,
    numero_buracos,
    tamanho     
  } =  request.body;

    
  try {
    await connection.transaction(async trx => {
        const id_material= await connection('tb_material')

     await connection('tb_material')
     .insert({
      fk_id_referencia,
      fk_id_cutsheet,
      fk_id_tamanho,
      nome,
      quantidade,
      dimensao,
      cor,
      tipo,
      cod_cones,
      numero_buracos,
      tamanho
        })
     .transacting(trx);
    });
    return response.status(200).send({message: 'Registro Efectuado com Sucesso!'});
  } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+" "+err});
            }
    },


    async deleteMaterial(request, response){
      const {id} = request.params;

     const deletar = await connection('tb_material')
                      .where('pk_id_material', id)
                      .delete();
      
                      

        return response.status(204).send({message: 'Operacao Efectuada Com Sucesso'});   

  },

  
}
