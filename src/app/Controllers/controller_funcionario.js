const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_funcionario(request, response, trs) {
    const funcionarios = await connection('tb_funcionario')
      .select('*');
    return response.json(funcionarios);

  },


  async registar_funcionario(request, response, trx) {
    const {
      nome_funcionario,
      fk_id_linha,
      genero,
      nr_bi,
      nr_nui,
      nome_bairro,
      quarteirao_nr,
      casa_nr,
      nr_telefone,
      nr_funcionario,
      data_nascimento
    } = request.body;


    //try {

    const funcionario = await connection('tb_funcionario')
      .where({ nr_bi }).first();

    if (funcionario) {
      return response.status(400).send({ status: 400, error: 'funcionario ja regitrada' });
    }
    await connection.transaction(async trx => {
      const id_usuario = await connection('tb_funcionario')

      await connection('tb_funcionario')
        .insert({
          nome_funcionario,
          fk_id_linha,
          genero,
          nr_bi,
          nr_nui,
          nome_bairro,
          quarteirao_nr,
          casa_nr,
          nr_telefone,
          nr_funcionario,
          data_nascimento
        })
        .transacting(trx);
    });
    return response.status(200).send({ status: 200, message: 'Registro Efectuado com Sucesso!' });
    /* } catch (err) {
       return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
     }*/
  },

  async deletefuncionario(request, response) {
    const { id } = request.params;

    const deletar = await connection('tb_funcionario')
      .where('pk_id_funcionario', id)
      .delete();
    return response.status(204).send({ status: 200, message: 'Operacao Efectuada Com Sucesso' });

  },

  async updatefuncionario(request, response) {
    const {
      pk_id_funcionario,
      nome_funcionario,
      fk_id_linha,
      genero,
      nr_bi,
      nr_nui,
      nome_bairro,
      quarteirao_nr,
      casa_nr,
      nr_telefone,
      nr_funcionario,
      data_nascimento
    } = request.body;

    const funcionario = await connection('tb_funcionario')
      .where('pk_id_funcionario', pk_id_funcionario)
      .select('*').first();

    if (funcionario) {
      const funcionarioUpdate = await connection('tb_funcionario')
        .where({ 'pk_id_funcionario': funcionario.pk_id_funcionario })
        .update({
          nome_funcionario,
          fk_id_linha,
          genero,
          nr_bi,
          nr_nui,
          nome_bairro,
          quarteirao_nr,
          casa_nr,
          nr_telefone,
          nr_funcionario,
          data_nascimento
        });
      return response.status(200).send({ status: 200, msg: "funcionario Actualizado com Sucesso " });
    } else if (!user) {
      return response.json({ status: 404, msg: "Problemas na autenticacao" });
    }

  },

}
