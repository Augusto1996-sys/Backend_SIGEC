const express = require('express');
const connection = require('../../database/conenection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
    async listar_stock(request, response) {

        const stocks = await connection('tb_stock')
            .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_stock.fk_id_referencia', 'tb_referencia_produto.pk_id_referencia')
            .join('tb_tamanho', 'tb_stock.fk_id_tamanho ', 'tb_tamanho.pk_id_tamanho')
            .select('*')
            .orderBy('pk_id_stock ', 'DESC');
        return response.json(stocks);

    },
    async liststocksByCs(request, response) {
        const { codigo_cut } = request.body;
        const Cutsheet = await connection('tb_cutsheet')
            .where('codigo_cutsheet', codigo_cut)
            .select('*')
            .first();
        if (Cutsheet)
            return response.status(200).send({ Cutsheet });
        else return response.status(400).send({ message: 'Cutsheet Inexistente!' });
        ///return response.status(200).send({message: 'O Id A listar'+ ' '+id});

    },


    async registar_stock(request, response, trx) {
        const {
            fk_id_cutsheet,
            nome,
            qty_recebida,
            qty_erequisitada,
            qty_remanascente,
        } = request.body;


        try {

            const stock = await connection('tb_stock')
                .where({ fk_id_cutsheet })
                .andWhere({ fk_id_cutsheet })
                .andWhere({ nome })
                .first();

            if (!stock) {

                await connection.transaction(async trx => {
                    const id_stock = await connection('tb_stock')
                        .insert({
                            fk_id_cutsheet,
                            nome,
                            qty_recebida,
                            qty_erequisitada,
                            qty_remanascente,
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
                        .update({
                            qty_recebida: stock.qty_recebida + qty_recebida,
                            qty_remanascente: stock.qty_remanascente + qty_recebida
                        })
                        .transacting(trx);
                });
                return response.status(200).send({ message: 'Stock Actualizadodo com Sucesso!' });
            }
        } catch (err) {
            return response.status(400).send({ error: 'Falha na Operacao! Tente Novamente' + " " + err });
        }
    },
    

    async listStockBycodCutsheet(request, response) {
        const {codigo_cutsheet} = request.body;
        const results = await connection('tb_stock')
            .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_stock.fk_id_referencia', 'tb_referencia_produto.pk_id_referencia')
            .join('tb_tamanho', 'tb_stock.fk_id_tamanho ', 'tb_tamanho.pk_id_tamanho')
            .where('tb_cutsheet.codigo_cutsheet ', codigo_cutsheet)
            .select('*')
        return response.json(results);
    },
    async listStockByCutsheet(request, response) {
        const {fk_id_cutsheet} = request.body;
        const results = await connection('tb_stock')
            .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_stock.fk_id_referencia', 'tb_referencia_produto.pk_id_referencia')
            .join('tb_tamanho', 'tb_stock.fk_id_tamanho ', 'tb_tamanho.pk_id_tamanho')
            .where('tb_stock.fk_id_cutsheet ', fk_id_cutsheet)
            .select('*')
        return response.json(results);
    },


    async listrefrenciaByCutsheetandStock(request, response) {
        const { fk_id_cutsheet,
            pk_id_stock } = request.body;
        const results = await connection('tb_stock')

            .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_stock.fk_id_referencia', 'tb_referencia_produto.pk_id_referencia')
            .join('tb_tamanho', 'tb_stock.fk_id_tamanho ', 'tb_tamanho.pk_id_tamanho')
            .where('pk_id_stock ', pk_id_stock)
            .andWhere('fk_id_cutsheet', fk_id_cutsheet)
            .select('pk_id_referencia', 'refencia')
        return response.json(results);
    },

    async listTamanhoByCutsheetandStockandRefern(request, response) {
        const { fk_id_cutsheet,
            pk_id_stock, fk_id_referencia } = request.body;
        const results = await connection('tb_stock')

            .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_stock.fk_id_referencia', 'tb_referencia_produto.pk_id_referencia')
            .join('tb_tamanho', 'tb_stock.fk_id_tamanho ', 'tb_tamanho.pk_id_tamanho')
            .where('pk_id_stock ', pk_id_stock)
            .andWhere('fk_id_cutsheet', fk_id_cutsheet)
            .andWhere('fk_id_referencia', fk_id_referencia)
            .select('pk_id_tamanho', 'tamanho')
        return response.json(results);
    },

    async listCorByCutsheetandStockandRefern(request, response) {
        const { fk_id_cutsheet,
            pk_id_stock, fk_id_referencia, tamanho } = request.body;
        const results = await connection('tb_stock')

            .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_stock.fk_id_referencia', 'tb_referencia_produto.pk_id_referencia')
            .join('tb_tamanho', 'tb_stock.fk_id_tamanho ', 'tb_tamanho.pk_id_tamanho')
            .where('pk_id_stock ', pk_id_stock)
            .andWhere('fk_id_cutsheet', fk_id_cutsheet)
            .andWhere('fk_id_referencia', fk_id_referencia)
            .andWhere('pk_id_tamanho', tamanho)
            .select('cor')
        return response.json(results);
    },
    

    async listQuantidadeByCutsheetandStockandRefern(request, response) {
        const { fk_id_cutsheet,
            pk_id_stock, fk_id_referencia, tamanho, cor } = request.body;
        const results = await connection('tb_stock')

            .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_stock.fk_id_referencia', 'tb_referencia_produto.pk_id_referencia')
            .join('tb_tamanho', 'tb_stock.fk_id_tamanho ', 'tb_tamanho.pk_id_tamanho')
            .where('pk_id_stock ', pk_id_stock)
            .select('qty_remanascente','nome')
            .first()
        return response.json(results);
    },


    async listQuantidadeByCutsheetandStockandcod(request, response) {
        const { codigo_cutsheet,nome,
            pk_id_stock, fk_id_referencia, tamanho, cor } = request.body;
        const results = await connection('tb_stock')

            .join('tb_cutsheet', 'tb_stock.fk_id_cutsheet', 'tb_cutsheet.pk_id_cutsheet')
            .join('tb_referencia_produto', 'tb_stock.fk_id_referencia', 'tb_referencia_produto.pk_id_referencia')
            .join('tb_tamanho', 'tb_stock.fk_id_tamanho ', 'tb_tamanho.pk_id_tamanho')
            .where('tb_stock.nome ', nome)
            .andWhere('codigo_cutsheet ', codigo_cutsheet)
            .select('qty_remanascente')
            .first()
        return response.json(results);
    },


    async upDateStock(request, response) {

        const {
            pk_id_stock,
            nome,
            fk_id_cutsheet,
            qty_recebida,
            qty_erequisitada,
            qty_remanascente
        } = request.body;

        const stock = await connection('tb_stock')
            .where('pk_id_stock', pk_id_stock)
            .select('*').first();

        if (stock) {
            const stockUpdate = await connection('tb_stock')
                .where({ 'pk_id_stock': stock.pk_id_stock })
                .update({
                    pk_id_stock,
                    nome,
                    fk_id_cutsheet,
                    qty_recebida,
                    nome,
                    qty_erequisitada,
                    qty_remanascente
                });
            return response.status(200).send({ status: 200, msg: "stock Actualizado com Sucesso: " + stockUpdate });
        } else if (!user) {
            return response.json({ status: 404, msg: "Problemas na autenticacao" });
        }

    },

}
