const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  async listar_cutsheetCamisa(request, response) {
    const per = "Blouse"
    const cutsheetCamisa = await connection('tb_cutsheet')    
      .where('tipo_peca', per)
      .select('*')      
      .orderBy('pk_id_cutsheet ', 'DESC');
    return response.json(cutsheetCamisa);

  },

  async registar_cutsheetCamisa(request, response, trx) {
    const pecas = "Blouse"
    const {
      codigo_cutsheet,
      cod_tecido1,
      cod_tecido2,
      quantidade_peca, 
      metragem_tecido,
      cod_intertela1,
      cod_intertela2,
      metragem_intertela,
      tipo_etiqueta,
      especifidade_peca,
      nr_cortes,
      cor,
      cod_cones
    } = request.body;


    const cutsheetCamisa = await connection('tb_cutsheet')
                          .where({codigo_cutsheet})
                          .first();

    if (cutsheetCamisa) {
      return response.status(400).send({ status: 204, error: 'cutsheet de Camisas ja regitrada' });
    }


    try {
      await connection.transaction(
        async trx => {
          const id_cutsheet = await connection('tb_cutsheet')

          await connection('tb_cutsheet')
            .insert({
              codigo_cutsheet,
              cod_tecido1,
              cod_tecido2,
              tipo_peca: pecas,
              quantidade_peca,
              metragem_tecido,
              cod_intertela1,
              cod_intertela2,
              metragem_intertela,
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


  async deleteCutsheetCamisa(request, response) {
    const { id } = request.params;


    try {

      const deletar = await connection('tb_cutsheet')
        .where('pk_id_cutsheet', id)
        .delete();

    } catch (error) {

    }



  },

}
