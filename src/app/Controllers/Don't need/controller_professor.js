const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_professor(request, response, trs) {
    const professores = await connection('tb_professor')
      .join('tb_pessoa', 'tb_professor.fk_id_pessoa', 'tb_pessoa.id_pessoa')
      .join('tb_usuario', 'tb_pessoa.fk_id_users', 'tb_usuario.id_users')
      .join('tb_tipo_usuario', 'tb_usuario.fk_id_tipo_usuario', 'tb_tipo_usuario.id_tipo_usuario')
      .select('*');
    return response.json(professores);

  },

  async registar_professor(request, response) {
    const {
      apelido,
      outros_nomes,
      nr_bi,
      data_nascimento,
      genero,
      nme_bairro,
      distrito,
      rua,
      nr_casa,
      nr_quarteirao,
      fk_id_tipo_usuario,
      email,
      password } = request.body;

    try {
      const dt = new Date();
      const dia = dt.getDate() // pegando o dia do do mes
      const ano = dt.getUTCFullYear() // pegando o ano
      const horas = dt.getHours()
      const segundos = dt.getSeconds()
      const milsegundos = dt.getMilliseconds();
      const min_segundos = (horas * 60) + milsegundos + (segundos * 60)

      const id_pessoa = `${crypto.randomBytes(4).toString('Hex')}${apelido[0]}`;

      const pessoa = await connection('tb_pessoa').where({ nr_bi }).first();

      if (pessoa) return response.status(400).send({ error: 'Pessoa ja regitrada' });


      if (fk_id_tipo_usuario == 2) {

        const codigo = 'P' + ano + '.' + min_segundos + '.' + dia;

        await connection.transaction(async trx => {
          const id_usuario = await connection('tb_usuario')
            .insert({
              fk_id_tipo_usuario,
              email,
              password
            }, 'id_usuario')
            .transacting(trx);

          const id_endereco = await connection('tb_endereco')
            .insert({
              nme_bairro,
              rua,
              nr_casa,
              nr_quarteirao

            }, 'id_endereco')
            .transacting(trx);

          await connection('tb_pessoa')
            .insert({
              id_pessoa,
              fk_id_users: id_usuario[0],
              fk_id_endereco: id_endereco[0],
              apelido,
              outros_nomes,
              nr_bi,
              data_nascimento,
              genero,
              distrito
            })
            .transacting(trx);

          await connection('tb_professor')
            .insert({
              fk_id_pessoa: id_pessoa,
              codigo_professor: codigo
            })
            .transacting(trx);

        });


        return response.status(200).send({ message: 'Professor Registrado com sucesso' });
      }


      return response.status(200).send({ message: 'Falha no Registrado! Verifica Seus Dados' });


    } catch (err) {
      return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
    }

  },


}
