const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
    async listar_rolo(request, response, trs) {

        const tip_material = "Rolo"
        const rolos = await connection('tb_material')
            .join('tb_cutsheet', 'tb_material.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_material.fk_id_referencia', 'tb_referencia_produto.	pk_id_referencia ')
            .where('nome_generico', tip_material)
            .select('*')
            .orderBy('pk_id_material ', 'DESC');



        return response.json(rolos);

    },
    async listRolosByCs(request, response) {
        const { codigo_cut } = request.body;
        const Cutsheet = await connection('tb_cutsheet')
            .where('codigo_cutsheet', codigo_cut)
            .select('*')
            .first();
        return response.json(Cutsheet);
        ///return response.status(200).send({message: 'O Id A listar'+ ' '+id});

    },


    async registar_rolo(request, response, trx) {
        const nome_generico = "Rolo";
        const {
            pk_id_material,
            fk_id_referencia,
            fk_id_cutsheet,
            fk_id_tamanho,
            nome,
            cor_material,
            shade,
            invoice_nr,
            metragem,
            bale_number,
            estado_rolo
        } = request.body;


        //try {

        const material = await connection('tb_material')
            .where({ fk_id_referencia })
            .andWhere({ bale_number })
            .andWhere({ fk_id_cutsheet })
            .andWhere({ nome })
            .andWhere({ cor_material })
            .first();



        if (material)
            return response.status(405).send({ status: 405, error: 'rolo Ja Registrado ja regitrada' });

        else if (!material) {

            await connection.transaction(async trx => {
                const id_material = await connection('tb_material')
                    .insert({
                        pk_id_material,
                        fk_id_referencia,
                        fk_id_cutsheet,
                        fk_id_tamanho,
                        nome_generico: nome_generico,
                        invoice_nr,
                        nome,
                        cor_material,
                        shade,
                        metragem,
                        bale_number,
                        estado_rolo
                    })
                    .transacting(trx);
            });
            const stock = await connection('tb_stock')
                .where({ fk_id_cutsheet })
                .andWhere({ fk_id_referencia })
                .andWhere({ cor_stock: cor_material })
                .andWhere({ nome })
                .first();

            if (!stock) {

                await connection.transaction(async trx => {
                    const id_stock = await connection('tb_stock')
                        .insert({
                            fk_id_cutsheet,
                            nome,
                            fk_id_referencia,
                            fk_id_tamanho,
                            cor_stock: cor_material,
                            qty_recebida: metragem,
                            qty_erequisitada: 0,
                            qty_remanascente: metragem,
                        })
                        .transacting(trx);
                });

                return response.status(200).send({ status: 200, message: 'stock Registrodo com Sucesso!' });
            }
            else if (stock) {
                await connection.transaction(async trx => {
                    const id_stock = await connection('tb_stock')
                        .where('tb_stock.nome', nome)
                        .where('tb_stock.fk_id_cutsheet', fk_id_cutsheet)
                        .where('tb_stock.fk_id_referencia', fk_id_referencia)
                        .where('tb_stock.cor_stock', cor_material)
                        .update({
                            qty_recebida: stock.qty_recebida + (parseInt(metragem)),
                            qty_remanascente: stock.qty_remanascente + (parseInt(metragem))
                        })
                        .transacting(trx);
                });
                return response.status(200).send({ message: 'Stock Actualizadodo com Sucesso!' });
            }
            return response.status(400).send({ message: 'rolo Registrodo com Sucesso!' + stock.fk_id_cutsheet });
        }
        /* } catch (err) {
             return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
         }*/
    },

    async update_rolo(request, response) {
        const {
            pk_id_material,
            fk_id_referencia,
            fk_id_cutsheet,
            nome,
            cor_material,
            shade,
            invoice_nr,
            metragem,
            bale_number,
            estado_rolo
        } = request.body;

        const material = await connection('tb_material')
            .where('pk_id_material', pk_id_material)
            .select('*').first();

        if (material) {
            const materialUpdate = await connection('tb_material')
                .where({ 'pk_id_material': material.pk_id_material })
                .update({
                    pk_id_material,
                    fk_id_referencia,
                    fk_id_cutsheet,

                    nome,
                    cor_material,
                    shade,
                    invoice_nr,
                    metragem,
                    bale_number,
                    estado_rolo
                });
            return response.status(200).send({ status: 200, msg: "material Actualizado com Sucesso " });
        } else if (!user) {
            return response.json({ status: 404, msg: "Problemas na autenticacao" });
        }

    },






}
