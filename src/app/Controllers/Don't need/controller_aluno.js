const express = require('express');
const connection = require('../../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

	module.exports = {
  async listar_aluno(request, response, trs){
   const alunos = await connection('tb_aluno')   
   .join('tb_pessoa', 'tb_aluno.fk_id_pessoa','tb_pessoa.id_pessoa')                     
   .join('tb_usuario', 'tb_pessoa.fk_id_users','tb_usuario.id_users')
   .join('tb_tipo_usuario', 'tb_usuario.fk_id_tipo_usuario','tb_tipo_usuario.id_tipo_usuario')
    .select('*');
   return response.json(alunos);
   
  },


  async listAlunoByID(request, response){
    const {id}= request.params;
    const alunos = await connection('tb_aluno')       
   .join('tb_pessoa', 'tb_aluno.fk_id_pessoa','tb_pessoa.id_pessoa')                     
   .join('tb_usuario', 'tb_pessoa.fk_id_users','tb_usuario.id_users')
   .join('tb_tipo_usuario', 'tb_usuario.fk_id_tipo_usuario','tb_tipo_usuario.id_tipo_usuario')                   
    .where('id_aluno', id)
    .select('*');
    return response.json(alunos);
    ///return response.status(200).send({message: 'O Id A listar'+ ' '+id});

},


  async registar_aluno(request, response, trs){
    const {
      apelido, 
      outros_nomes, 
      nr_bi, 
      data_nascimento, 
      genero,
      nome_bairro,
      distrito,
      rua,
      nr_casa,
      nr_quarteirao,
      fk_id_tipo_usuario,
      email,
      password} =  request.body;
     
      try {
          const dt = new Date();
          const dia = dt.getDate() // pegando o dia do do mes
          const ano = dt.getUTCFullYear() // pegando o ano
          const horas = dt.getHours()
          const segundos = dt.getSeconds()  
          const mes = dt.getMonth()      
          const milsegundos = dt.getMilliseconds();
          const min_segundos = (horas*60) + milsegundos+(segundos*60) 
          const nome_classe = "90Classe" 
       
          const id_pessoa = `${crypto.randomBytes(4).toString('Hex')}${apelido[0]}`;

          const pessoa = await connection('tb_pessoa')                              
                                .join('tb_usuario', 'tb_pessoa.fk_id_users','tb_usuario.id_users')              
                                .where({nr_bi})
                                .orWhere({email})                                
                                .orWhere({outros_nomes}).first();
      
          if(pessoa) return response.status(400).send({error: 'Pessoa ja regitrada! Email, Nr BI ou Nome Pesoal ja Cadastrados'}); 


          if(fk_id_tipo_usuario == 1){
                
            const codigo = 'A'+ano+'.'+min_segundos+'.'+mes;
            
          await connection.transaction(async trx => {
            const id_usuario = await connection('tb_usuario')
              .insert({
                fk_id_tipo_usuario,
                email,
                password}, 'id_usuario')
              .transacting(trx);

              const id_endereco =  await connection('tb_endereco')
                .insert({nme_bairro:nome_bairro,
                          rua,
                          nr_casa,
                          nr_quarteirao

                         }, 'id_endereco')
                .transacting(trx);
      
              await connection('tb_pessoa')
                .insert({id_pessoa,
                         fk_id_users:id_usuario[0],
                         fk_id_endereco:id_endereco[0],  
                         apelido, 
                         outros_nomes, 
                         nr_bi, 
                         data_nascimento, 
                         genero,
                         distrito
                        })
                .transacting(trx);

                  await connection('tb_aluno')
                    .insert({
                      fk_id_pessoa:id_pessoa,
                      codigo_aluno:codigo
                          })
                    .transacting(trx);
        
          });
         

          return response.status(200).send({message: 'Aluno Registrado com sucesso'});
          }

          return response.status(200).send({message: 'Falha no Registrado! Escoheu um tipo de Usuario nao esperado'});


          } catch (err) {
              return response.status(400).send({error: 'Falha na Operacao! Tente Novamente'+" "+err});
            }
    },

  
}
