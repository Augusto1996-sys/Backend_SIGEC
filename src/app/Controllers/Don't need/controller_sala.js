const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_sala(request, response) {
    const salas = await connection('tb_sala').select('*');
    return response.json(salas);

  },



  async registar_sala(request, response) {
    const { nr_sala, lotacao_sala, detalhes } = request.body;
    try {

      const user = await connection('tb_sala')
        .where({ nr_sala }).first();
      if (user) return response.status(400).send({ error: 'Sala de Aulas ja cadastrada ' });
      const id_sala = await connection('tb_sala').insert({
        nr_sala,
        lotacao_sala,
        detalhes

      });
      const sala_Registrada = await connection('tb_sala')
        .where({ id_sala })
        .orWhere({ nr_sala }).first();
      // sala_Registrada.id_sala = undefined;
      return response.send({
        sala_Registrada
      });
    } catch (err) {
      return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + err });
    }
  },


}
