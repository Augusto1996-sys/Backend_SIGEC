const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_operario(request, response, trs) {
    const operarios = await connection('tb_operario')
      .select('pk_id_operario',
        'nome_operario',
        'nr_bi',
        'genero',
        'nr_operario',
        'nome_bairro',
        'nr_telefone')
      .orderBy('nr_operario ', 'DESC');
    return response.json(operarios);

  },
  async registar_operario(request, response, trx) {
    const {
      nome_operario,
      genero,
      nr_bi,
      nr_nui,
      nome_bairro,
      quarteirao_nr,
      casa_nr,
      nr_telefone,
      nr_operario,
      data_nascimento
    } = request.body;


    try {

      const operario = await connection('tb_operario')
        .where({ nome_operario })
        .orWhere({ nr_bi })
        .orWhere({ nr_nui })
        .orWhere({ nr_operario })
        .first();
      if (operario) return response.status(400).send({ status: 400, error: 'verifica seus Dados [Email ou operario]! Dados ja cadastrados ' });
      await connection('tb_operario').insert({
        nome_operario,
        genero,
        nr_bi,
        nr_nui,
        nome_bairro,
        quarteirao_nr,
        casa_nr,
        nr_telefone,
        nr_operario,
        data_nascimento
      });
      return response.status(200).send({ status: 200, message: 'Operacao Efectuada Com Sucesso' });
    } catch (error) {
      return response.status(401).send({ status: 401, error: 'Falha na Operacao! Tente Novamente ' + error });
    }
  },

  async deleteoperario(request, response) {
    const { id } = request.params;


    const operario = await connection('tb_operario')
      .where('pk_id_operario', id)
      .select('*').first();
    if (operario) {
      const deletar = await connection('tb_operario')
        .where('pk_id_operario', id)
        .delete();
      return response.status(200).send({ message: 'Operacao Efectuada Com Sucesso' });
    }
    else if (!operario) response.status(400).send({ message: 'Usuario Nao Encontrado' });



  },

  async updateoperario(request, response) {
    const {
      pk_id_operario,
      nome_operario,
      genero,
      nr_bi,
      nr_nui,
      nome_bairro,
      quarteirao_nr,
      casa_nr,
      nr_telefone,
      nr_operario,
      data_nascimento
    } = request.body;

    const operario = await connection('tb_operario')
      .where('pk_id_operario', pk_id_operario)
      .select('*').first();

    if (operario) {
      const operarioUpdate = await connection('tb_operario')
        .where({ 'pk_id_operario': operario.pk_id_operario })
        .update({
          pk_id_operario,
          nome_operario,
          genero,
          nr_bi,
          nr_nui,
          nome_bairro,
          quarteirao_nr,
          casa_nr,
          nr_telefone,
          nr_operario,
          data_nascimento
        });
      return response.status(200).send({ status: 200, msg: "operario Actualizado com Sucesso " });
    } else if (!operario) {
      return response.json({ status: 404, msg: "Problemas na autenticacao" });
    }

  },

}
