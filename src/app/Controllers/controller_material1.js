const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
    async listar_material1(request, response, trs) {

        const tip_material = "material1"
        const materials = await connection('tb_material')
            .join('tb_cutsheet', 'tb_material.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_material.fk_id_referencia', 'tb_referencia_produto.	pk_id_referencia ')
            .where('nome_generico', tip_material)
            .select(
                '*',

            )
            .orderBy('pk_id_material ', 'DESC');



        return response.json(materials);

    },
    async listmaterialsByCs(request, response) {
        const { codigo_cut } = request.body;
        const Cutsheet = await connection('tb_cutsheet')
            .where('codigo_cutsheet', codigo_cut)
            .select('*')
            .first();
        return response.json(Cutsheet);
        ///return response.status(200).send({message: 'O Id A listar'+ ' '+id});

    },


    async registar_material1(request, response, trx) {
        const nome_generico = "material1";
        const {
            fk_id_referencia,
            fk_id_cutsheet,
            fk_id_tamanho,
            nome,
            cor_material,
            quantidade_material,
            invoice_nr
        } = request.body;


        try {
            await connection.transaction(async trx => {
                const id_material = await connection('tb_material')
                    .insert({
                        fk_id_referencia,
                        fk_id_cutsheet,
                        fk_id_tamanho,
                        nome_generico: nome_generico,
                        invoice_nr,
                        nome,
                        quantidade_material,
                        cor_material
                    })
                    .transacting(trx);
            });
            const stock = await connection('tb_stock')
                .where({ fk_id_cutsheet })
                .andWhere({ fk_id_referencia })
                .andWhere({ fk_id_tamanho })
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
                            qty_recebida: quantidade_material,
                            qty_erequisitada: 0,
                            qty_remanascente: quantidade_material,
                        })
                        .transacting(trx);
                });

                return response.status(200).send({ message: 'stock Registrodo com Sucesso!' });
            }
            else if (stock) {
                await connection.transaction(async trx => {
                    const id_stock = await connection('tb_stock')
                        .where('tb_stock.nome', nome)
                        .where('tb_stock.fk_id_cutsheet', fk_id_cutsheet)
                        .where('tb_stock.fk_id_referencia', fk_id_referencia)
                        .where('tb_stock.fk_id_tamanho', fk_id_tamanho)
                        .update({
                            qty_recebida: stock.qty_recebida + (parseInt(quantidade_material)),
                            qty_remanascente: stock.qty_remanascente + (parseInt(quantidade_material))
                        })
                        .transacting(trx);
                });
                return response.status(200).send({ message: 'Stock Actualizadodo com Sucesso!' });
            }
            return response.status(200).send({ message: nome + 's Registrodo com Sucesso!' });

        } catch (err) {
            return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
        }
    },

    async update_material1(request, response) {
        const {
            pk_id_material,
            fk_id_referencia,
            fk_id_cutsheet,
            fk_id_tamanho,
            nome,
            cor_material,
            quantidade_material,
            invoice_nr
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
                    fk_id_tamanho,
                    nome,
                    quantidade_material,
                    cor_material,
                    invoice_nr
                });
            return response.status(200).send({ status: 200, msg: "material Actualizado com Sucesso " });
        } else if (!user) {
            return response.json({ status: 404, msg: "Problemas na autenticacao" });
        }

    },






}
