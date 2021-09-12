const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
/**
 * 
   
 */
module.exports = {
  async listar_requisicao(request, response) {
    const requisicao = await connection('tb_material_requisicao')
      .join('tb_requisicao', 'tb_material_requisicao.fk_id_requisicao', 'tb_requisicao.	pk_id_requisicao ')
      .join('tb_estado_requisicao', 'tb_requisicao.	fk_id_estado_requisicao  ', 'tb_estado_requisicao.pk_estado_requisicao ')
      .join('tb_stock', 'tb_material_requisicao.fk_id_stock ', 'tb_stock.	pk_id_stock ')
      .join('tb_referencia_produto', 'tb_stock.fk_id_referencia ', 'tb_referencia_produto.pk_id_referencia ')
      .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet  ', 'tb_cutsheet.pk_id_cutsheet')
      //.join('tb_operario', 'tb_usuarioc.fk_id_operario ', 'tb_operario.pk_id_operario')
      .select('pk_id_requisicao',
        'codigo_cutsheet',
        'tb_stock.nome',
        'refencia',
        'cor_stock',
        'quantidade_req',
        'created_at',)
      .orderBy('pk_id_material_requisicao  ', 'DESC');
    return response.json(requisicao);

  },
async registar_requisicaoArray(request, response) {
  const {
    fk_id_stock,
    quantidade_req,
    fk_id_estado_requisicao,
    fk_id_cutsheet,
    fk_id_referencia,
    fk_id_tamanho,
    cor_stock

  } = request.body;


  //try {
  const stock = await connection('tb_stock')
    .where({ pk_id_stock: fk_id_stock })
    .first();

  if (stock && stock.qty_recebida > quantidade_req) {
    await connection.transaction(async trx => {
      const pk_id_requisicao = await connection('tb_requisicao')
        .insert({
          fk_id_estado_requisicao
        }, 'pk_id_requisicao')
        .transacting(trx);

      await connection('tb_material_requisicao')
        .insert({
          fk_id_requisicao: pk_id_requisicao[0],
          fk_id_stock,
          quantidade_req
        })
        .transacting(trx);

      const result = await connection('tb_stock')
        .where('tb_stock.pk_id_stock', fk_id_stock)
        //.where('tb_stock.fk_id_cutsheet', fk_id_cutsheet)
        //.where('tb_stock.fk_id_referencia', fk_id_referencia)
        //.where('tb_stock.fk_id_tamanho', fk_id_tamanho)
        //.where('tb_stock.nome', nome)
        //.where('tb_stock.cor_stock', cor_stock)
        .update({
          qty_remanascente: stock.qty_remanascente - (parseInt(quantidade_req))
        })
        .transacting(trx);
    });
    return response.status(200).send({ massage: 'Pode Continuar ' })
  }
  else return response.status(400).send({ massage: 'Nao Pode ' })






},


async deleterequisicao(request, response) {
  const { id } = request.params;

  const deletar = await connection('tb_requisicao')
    .where('pk_id_requisicao', id)
    .delete();



  return response.status(204).send({ message: 'Operacao Efectuada Com Sucesso' });

},


async registar_requisicao(request, response) {
  const {
    pk_id_stock,
    quantidade_req
  } = request.body;


  //try {
  const stock = await connection('tb_stock')
    .where({ pk_id_stock: pk_id_stock })
    .first();

  if (stock) {
    if (stock.qty_recebida > quantidade_req) {
      await connection.transaction(async trx => {
        const pk_id_requisicao = await connection('tb_requisicao')
          .insert({
            fk_id_estado_requisicao: 1
          }, 'pk_id_requisicao')
          .transacting(trx);

        await connection('tb_material_requisicao')
          .insert({
            fk_id_requisicao: pk_id_requisicao[0],
            fk_id_stock: pk_id_stock,
            quantidade_req
          })
          .transacting(trx);

        const result = await connection('tb_stock')
          .where('tb_stock.pk_id_stock', pk_id_stock)
          .update({
            qty_remanascente: stock.qty_remanascente - (parseInt(quantidade_req)),
            qty_erequisitada: stock.qty_erequisitada + (parseInt(quantidade_req))
          })
          .transacting(trx);
      });
      return response.status(200).send({ massage: 'Pode Continuar ' })
    }
    else return response.status(400).send({ massage: 'Nao Pode ' })


  }

},

}
