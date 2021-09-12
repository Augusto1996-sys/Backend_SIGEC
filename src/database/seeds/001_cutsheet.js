
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_cutsheet').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_cutsheet').insert([
        {codigo_cutsheet:'13759', cod_tecido1:'9293',cod_tecido2:'9279',tipo_peca:'Trouser',
        quantidade_peca:21000, metragem_tecido:19000,cod_intertela1:'0338',metragem_intertela:12000,
        cod_bolso1:'2830', metragem_bolso:5420,especifidade_peca:'School',tipo_etiqueta:'Student Prince',nr_cortes:4,
        cor:'Ligth Grey'
      },
      {codigo_cutsheet:'13758', cod_tecido1:'9293',cod_tecido2:'9251',tipo_peca:'Trouser',
      quantidade_peca:19000, metragem_tecido:19000,cod_intertela1:'0338',metragem_intertela:12000,
      cod_bolso1:'2830', metragem_bolso:5420,especifidade_peca:'Elastic',tipo_etiqueta:'Student Prince',nr_cortes:4,
      cor:'Grey' },


      {codigo_cutsheet:'13713', cod_tecido1:'80/20 45x45 110x76',tipo_peca:'Blouse',
        quantidade_peca:21000, metragem_tecido:19000,cod_intertela1:'80/20',metragem_intertela:12000,
        especifidade_peca:'School',tipo_etiqueta:'1965 PEP',nr_cortes:4,
        cor:'White'
      },
      {codigo_cutsheet:'13712', cod_tecido1:'80/20 45x45 110x76',tipo_peca:'Blouse',
      quantidade_peca:21000, metragem_tecido:19000,cod_intertela1:'80/20',metragem_intertela:12000,
      especifidade_peca:'Fashion',tipo_etiqueta:'1965 PEP',nr_cortes:4,
      cor:'White'},

      ]);
    });
};
