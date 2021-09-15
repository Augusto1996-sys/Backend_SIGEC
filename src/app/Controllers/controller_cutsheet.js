const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_cutsheet(request, response) {
    const cutsheet = await connection('tb_cutsheet')
      .select('*')
      .orderBy('pk_id_cutsheet ', 'DESC');
    return response.json(cutsheet);

  },

  async listar_cutsheetByRecolha(request, response) {

    const { fk_id_funcionario } = request.body;
    id = fk_id_funcionario
    const cutsheet = await connection('tb_operario_linha')
      .join('tb_cutsheet', 'tb_operario_linha.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
      .join('tb_operario', 'tb_operario_linha.fk_id_operario ', 'tb_operario.pk_id_operario ')
      .where('fk_id_operario', id)
      .select('*')
    return response.json(cutsheet);

  },

  async listar_cutsheetByID(request, response) {

    const { pk_id_cutsheet } = request.body;
    id = pk_id_cutsheet
    const cutsheet = await connection('tb_cutsheet')
      .where('pk_id_cutsheet', id)
      .select('codigo_cutsheet')
      .first()
    return response.json(cutsheet);

  },

  async registar_cutsheet(request, response, trx) {
    const {
      codigo_cutsheet,
      cod_tecido1,
      cod_tecido2,
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
      especifidade_peca,
      nr_cortes,
      cor,
      cod_cones
    } = request.body;


    try {
      await connection.transaction(
        async trx => {
          const id_cutsheet = await connection('tb_cutsheet')

          await connection('tb_cutsheet')
            .insert({
              codigo_cutsheet,
              cod_tecido1,
              cod_tecido2,
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
              especifidade_peca,
              nr_cortes,
              cor,
              cod_cones
            })
            .transacting(trx);
        });
      return response.status(200).send({ message: 'Registro Efectuado com Sucesso!' });
    } catch (err) {
      return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
    }
  },


  async deleteCutsheet(request, response) {
    const { id } = request.params;

    const deletar = await connection('tb_cutsheet')
      .where('pk_id_cutsheet', id)
      .delete();



    return response.status(204).send({ message: 'Operacao Efectuada Com Sucesso' });

  },

}
