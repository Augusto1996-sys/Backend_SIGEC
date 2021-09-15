const express = require('express');
const connection = require('../../database/conenection');
const authConfig = require('../../config/auth.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer')
const { Console } = require('console');

function generetToken(params = {}) {
  return jwt.sign(params,
    authConfig.secret,
    { expiresIn: 86400 });
}

module.exports = {
  async listar_usuario(request, response) {
    const user = await connection('tb_usuarioc')
      .select('*')
      .orderBy('created_at_usuarioc ', 'desc')
    return response.json(user);

  },



  async registar_usuario(request, response) {
    const {
      fullname,
      email,
      password,
      nivel,
      state
    } = request.body;
    try {

      const user = await connection('tb_usuarioc')
        .where({ email })
        .andWhere({ fullname })
        .first();
      if (user) return response.status(400).send({ error: 'verifica seus Dados [Email ou operario]! Dados ja cadastrados ' });
      const password_hash = await bcrypt.hash(password, 10);
      await connection('tb_usuarioc').insert({
        fullname,
        email,
        nivel,
        password: password_hash,
        state
      });
      const user_Registrado = await connection('tb_usuarioc')
        .where({ email }).first();
      user_Registrado.password = undefined;
      user_Registrado.passwordResetToken = undefined;
      user_Registrado.passwordResetExpires = undefined;
      user_Registrado.update_at = undefined;
      /*return response.send({
        user_Registrado,
        token: generetToken({ id: user_Registrado.id }),
      });*/

      return response.status(200).send({ message: 'Operacao Efectuada Com Sucesso' });
    } catch (error) {
      return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente ' + error });
    }
  },
  async deleteUsuario(request, response) {
    const { id } = request.params;
    try {
      const user = await connection('tb_usuarioc')
        .where('pk_id_usuarioc', id)
        .select('*').first();
      if (user) {
        const deletar = await connection('tb_usuarioc')
          .where('pk_id_usuarioc', id)
          .delete();

        return response.status(200).send({ message: 'Operacao Efectuada Com Sucesso' });
      } else response.status(404).send({ message: 'Usuario Nao Encontrado' });

    } catch (error) {
      return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente ' + error });
    }

  },
  async esqueci_Senha(request, response) {
    const { email_recuperar } = request.body;
    try {
      const user = await connection('tb_usuarioc')
        .where('email', email_recuperar)
        .select('*').first();
      if (!user) return response.status(400).send({ error: 'user  not found' });

      if (user) {

        const passwordResetToken = crypto.randomBytes(20).toString('hex');
        const update_at = new Date();
        const passwordResetExpires = new Date();
        passwordResetExpires.setHours(passwordResetExpires.getHours() + 1);

        const setToken = await connection('tb_usuarioc')
          .where({ id_users: user.id_users })
          .update({ passwordResetToken, passwordResetExpires, update_at });
        //console.log(user)
        mailer.sendMail({
          to: email_recuperar,
          from: 'geteasy@plusteck.com',
          subject: 'forgot password',
          text: `recuperacao de senha Didi Hoje www.geteasy.plusteck.co.mz/fogot_password?auth=${passwordResetToken}`,
          html: `recuperacao de senha Didi Hoje <a href='www.geteasy.plusteck.co.mz/fogot_password?auth=${passwordResetToken}'>link</a>`,
        }, (err) => {
          if (err)
            return response.status(400).send({ error: 'can not send forgot password mail' });
        });
        return response.status(200).send({ message: 'email sent ' + passwordResetToken });
      }
    } catch (err) {
      console.log(err);
      return response.status(400).send({ error: 'Erro on fogot passoword,  try again. ' + err });
    }
  },


  async updateUsuario(request, response) {
    const {
      pk_id_usuarioc,
      fullname,
      email,
      password,
      nivel,
      state
    } = request.body;

    try {
      const user = await connection('tb_usuarioc')
        .where('pk_id_usuarioc', pk_id_usuarioc)
        .select('*').first();

      const password_hash = await bcrypt.hash(password, 10);
      if (user) {
        const userUpdate = await connection('tb_usuarioc')
          .where({ pk_id_usuarioc: user.pk_id_usuarioc })
          .update({
            fullname,
            email,
            password :password_hash,
            nivel,
            state
          });
        return response.status(200).send({ status: 200, msg: "Usuario Actualizado com Sucesso" });
      } else if (!user) {
        return response.status(404).send({ status: 404, msg: "Problemas na autenticacao" });
      }

    } catch (error) {

      return response.status(400).send({ error: 'Erro on fogot passoword,  try again. ' + error });
    }

  },

  async listUsuarioByID(request, response) {
    const { id } = request.params;
    const Usuario = await connection('tb_usuarioc')
      .where('pk_id_usuarioc', id)
      .select('*')
      .first();
    return response.json(Usuario);
    ///return response.status(200).send({message: 'O Id A listar'+ ' '+id});

  },
  async autenticacao_usuario(request, response) {
    const { email_login, password_login } = request.body;

    try {

      const user_logado = await connection('tb_usuarioc')
        .where('tb_usuarioc.email', email_login)
        .select('*')
        .first();

      if (!user_logado) {
        response.status(400).json({ status: 400, error: 'Verifica seus Dados! Usuario Invalido' })


      }
      const senha = await bcrypt.compare(password_login, user_logado.password);
      if (senha) {
        /*user_logado.id =undefined;
        
        user_logado.password =undefined;
        user_logado.passwordResetToken =undefined;
        user_logado.passwordResetExpires =undefined;
        user_logado.update_at =undefined;*/
        response.status(200).json({
          status: 1,
          id_users: user_logado.id_users,
          email: user_logado.email,
          password: user_logado.password,
          token: generetToken({ id: user_logado.id }),
        })
      }
      if (!senha) return response.status(400).send({ status: 2, error: 'Senha Invalido! Verifica Sua Senha' });

    } catch (err) {
      return response.status(400).send({ error: 'Falha na Autenticacao! Tente Novamente ' + err });
    }

  },


  async recuperar_senha(request, response) {
    const { email, token, password } = request.body;


    try {

      const user = await connection('tb_usuarioc')
        .where('email', email)
        .select('*').first();
      if (!user) return response.status(400).send({ error: 'Usuario nao encontrado' });

      if (token !== user.passwordResetToken) return response.status(400).send({ error: 'Token Invalido' });


      const dataAtual = new Date();

      if (dataAtual > user.passwordResetExpires) return response.status(400).send({ error: 'O seu token expirou! Procure geral um novo' });
      const password_hash = await bcrypt.hash(password, 10);
      if (user) {
        const setToken = await connection('tb_usuarioc')
          .where({ id: user.id })
          .update({ password: password_hash });
        response.send();
      }
    } catch (err) {
      console.log(err);
      return response.status(400).send({ error: 'Falha na Recuperacao da Senha,  Tenta Novamente. ' + err });
    }

  },
  async destroyToken(request, response) {
    const token = request.headers.token;
    if (token) {
      response.cookie('token', null, { httpOnly: true });
    } else {
      response.status(401).send("Logout Nao Autorizado!");
    }
    response.send("Sessao Finalizada com sucesso!");
  },

  async checkToken(request, response) {

    const token = request.query.token || request.body.token || request.cookies.token || request.headers['x-acess-token'];
    ///console.log(token)
    if (!token) {
      return response.json({ status: 401, msg: "Nao Autorizado: Token Nao inexistente" });
    } else {
      jwt.verify(token, authConfig.secret, (erro, decoded) => {
        if (erro) {
          return response.json({ status: 401, msg: "Nao Autorizado: Token Nao invalido" });
        } else {

          response.json({ status: 200 });
        }

      });
    }

  },


}
