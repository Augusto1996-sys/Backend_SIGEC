const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
    async listar_rolo(request, response, trs) {

        const tip_material = "MaterialG1"
        const rolos = await connection('tb_material')
            .where('nome_generico', tip_material)
            .select(
                'tb_material.pk_id_material',
                'tb_material.fk_id_referencia',

                'tb_material.fk_id_cutsheet',
                'tb_material.fk_id_tamanho',
                'tb_material.numero_buracos',
                'tb_material.cor',
                'tb_material.tipo',
                'tb_material.quantidade',
                'tb_material.nome',
                'tb_material.tamanho',
            )


            .orderBy('pk_id_material ', 'DESC');



        return response.json(rolos);

    },


    async registar_rolo(request, response, trx) {
        const {
            pk_id_material,
            fk_id_referencia,
            fk_id_cutsheet,
            fk_id_tamanho,
            nome,
            cor,
            nome_generico,
            metragem,
            bale_number,
            estado_rolo
        } = request.body;


        try {

            await connection.transaction(async trx => {
                const id_material = await connection('tb_material')

                await connection('tb_material')
                    .insert({
                        pk_id_material,
                        fk_id_referencia,
                        fk_id_cutsheet,
                        fk_id_tamanho,
                        nome_generico: nome_generico,
                        nome,
                        cor,
                        metragem,
                        bale_number,
                        estado_rolo
                    })
                    .transacting(trx);
            });
            return response.status(200).send({ message: 'rolo Registrodo com Sucesso!' });
        } catch (err) {
            return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
        }
    },


}
