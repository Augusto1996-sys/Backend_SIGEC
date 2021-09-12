const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_bolso(request, response, trs) {

    const tip_material = "Bolso"
    const bolsos = await connection('tb_material')
      .where('nome', tip_material || "bolso")
      .select(
        'tb_material.pk_id_material',
        'tb_material.fk_id_referencia',
        'tb_material.fk_id_cutsheet',
        'tb_material.nome',
        'tb_material.cor',
        'tb_material.metragem',
        'tb_material.bale_number',
        'tb_material.estado_rolo',
      )

      .orderBy('pk_id_material ', 'DESC');



    return response.json(bolsos);

  },


  async registar_bolso(request, response, trx) {
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
    } = request.body;


    try {

      const material = await connection('tb_material')
        .where({ fk_id_referencia })
        .andWhere({ bale_number })
        .andWhere({ nome })
        .first();

      if (material) return response.status(400).send({ error: 'Bolso Ja Registrado ja regitrada' });
      await connection.transaction(async trx => {
        const id_material = await connection('tb_material')

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
            estado_rolo
          })
          .transacting(trx);
      });
      return response.status(200).send({ message: 'bolso Registrodo com Sucesso!' });
    } catch (err) {
      return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
    }
  },


}
