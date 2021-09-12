const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_alocar_operario(request, response, trs) {
    const operarios = await connection('tb_operario_linha')
      .join('tb_operario', 'tb_operario_linha.fk_id_operario', 'tb_operario.pk_id_operario ')
      .join('tb_linha', 'tb_operario_linha.fk_id_linha', 'tb_linha.pk_id_linha ')
      .join('tb_operacoes', 'tb_operario_linha.fk_id_operacao ', 'tb_operacoes.pk_id_operacoes')
      .join('tb_cutsheet', 'tb_operario_linha.	fk_id_cutsheet  ', 'tb_cutsheet.	pk_id_cutsheet ')
      .select('nome_operario', 'nome_sector', 'nr_linha', 'nome_operacao', 'codigo_cutsheet', 'pk_id_operario_linha')
      .orderBy('pk_id_operario_linha','desc')
    return response.json(operarios);

  },


  async registar_alocar_operario(request, response, trx) {
    const {
      fk_id_operario,
      fk_id_linha,
      fk_id_operacao,
      fk_id_cutsheet
    } = request.body;


    try {

      const operario = await connection('tb_operario_linha')
        .where({ fk_id_operario })
        .andWhere({ fk_id_linha })
        .andWhere({ fk_id_operacao })
        .andWhere({ fk_id_cutsheet })
        .first();
      if (operario) return response.status(400).send({ status: 400, error: 'verifica Os Dados! Operario ja Alocado ' });
      await connection('tb_operario_linha').insert({
        fk_id_operario,
        fk_id_linha,
        fk_id_operacao,
        fk_id_cutsheet
      });
      return response.status(200).send({ status: 200, message: 'Operacao Efectuada Com Sucesso' });
    } catch (error) {
      return response.status(401).send({ status: 401, error: 'Falha na Operacao! Tente Novamente ' + error });
    }
  },

  async delete_alocar_operario(request, response) {
    const { id } = request.params;


    const operario = await connection('tb_operario_linha')
      .where('pk_id_operario_linha ', id)
      .select('*')
      .first();
    if (operario) {
      const deletar = await connection('tb_operario_linha')
        .where('pk_id_operario_linha ', id)
        .delete();
      return response.status(200).send({ message: 'Operacao Efectuada Com Sucesso' });
    }
    else if (!operario) response.status(400).send({ message: 'Usuario Nao Encontrado' });



  },

  async update_alocar_operario(request, response) {
    const {
      pk_id_operario_linha,
      fk_id_operario,
      fk_id_linha,
      fk_id_operacao,
      fk_id_cutsheet
    } = request.body;

    const operario = await connection('tb_operario_linha')
      .where('pk_id_operario_linha', pk_id_operario_linha)
      .select('*')
      .first();

    if (operario) {
      const operarioUpdate = await connection('tb_operario_linha')
        .where({ 'pk_id_operario_linha': operario.pk_id_operario_linha })
        .update({

          fk_id_operario,
          fk_id_linha,
          fk_id_operacao,
          fk_id_cutsheet
        });
      return response.status(200).send({ status: 200, msg: "operario Actualizado com Sucesso " });
    } else if (!operario) {
      return response.status(400).send({ status: 400, msg: "Problemas na Actualizacao" });
    }

  },

}
