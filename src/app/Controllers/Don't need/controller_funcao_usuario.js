const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_funcao_usuario(request, response) {
    const funcao_usuario = await connection('tb_funcao_usuario').select('*');
    return response.json(funcao_usuario);

  },

  async registar_funcao_usuario(request, response) {
    const { descricao } = request.body;
    try {
      const descricao_usuario = await knex('tb_funcao_usuario').where({ descricao }).first();
      if (descricao_usuario) return res.status(400).send({ error: 'Descricao ja Registrada' });

      const id_funcao_usuario = await connection('tb_funcao_usuario').insert({ descricao }, 'id_funcao_usuario');
      return id_funcao_usuario;
    } catch (err) {
      return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + err });
    }
  },


}