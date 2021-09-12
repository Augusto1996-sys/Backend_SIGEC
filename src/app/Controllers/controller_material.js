const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_material(request, response, trs) {
    const material = await connection('tb_material')
      .join('tb_cutsheet', 'tb_material.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
      .select('*')
      .orderBy('pk_id_material ', 'DESC');
    return response.json(material);
    
  },

  async registar_material(request, response, trx) {
    const {
      fk_id_referencia,
      fk_id_cutsheet,
      fk_id_tamanho,
      nome,
      quantidade_material,
      dimensao,
      cor_material,
      tipo,
      cod_cones,
      numero_buracos,
      tamanho
    } = request.body;


    try {
      await connection.transaction(async trx => {
        const id_material = await connection('tb_material')

        await connection('tb_material')
          .insert({
            fk_id_referencia,
            fk_id_cutsheet,
            fk_id_tamanho,
            nome,
            quantidade_material,
            dimensao,
            cor_material,
            tipo,
            cod_cones,
            numero_buracos,
            tamanho
          })
          .transacting(trx);
      });
      return response.status(200).send({ message: 'Registro Efectuado com Sucesso!' });
    } catch (err) {
      return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
    }
  },


  async deleteMaterial(request, response) {
    const { id } = request.params;

    const deletar = await connection('tb_material')
      .where('pk_id_material', id)
      .delete();



    return response.status(204).send({ message: 'Operacao Efectuada Com Sucesso' });

  },


}
