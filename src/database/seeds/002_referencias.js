
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tb_referencia_produto').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_referencia_produto').insert([


        
        //refencia Tecido Bolso    
        { refencia: 'none', descricao: 'Sem nenhuma referencia' },
        { refencia: '9286', descricao: 'Tecido Para Bolso' },
        { refencia: '9256', descricao: 'Tecido Para Bolso' },
        //refencia  Butao de Camisa School
        { refencia: 'Enzo', descricao: 'Botao de Camisa de rolos completos' },
        { refencia: 'Express 11.5', descricao: 'Botao de Camisa 2 buracos' },
        { refencia: 'Humbra 11.5', descricao: 'Botao de Camisa 2 buracos' },
        //refencia  Butao de Camisa Fashion
        { refencia: 'Oakridge 11.5', descricao: 'Botao de Camisa de pequenos rolinhos' },
        { refencia: 'Oakridge 9.5', descricao: 'Botao de Camisa de pequenos rolinhos' },
        //refencia Intertela Camisa      
        { refencia: '9750', descricao: 'Intertela Para Tecido School' },
        { refencia: '80/20', descricao: 'Intertela Para Tecido School' },
        { refencia: '5034', descricao: 'Intertela Para Tecido School e Fashion de Calsa camisa' },
        { refencia: '3205', descricao: 'Intertela Para Tecido Fashion' },
        //refencia Tecido Camisa
        { refencia: '80/20 45x45 110x76', descricao: 'Tecido School' },
        { refencia: '65/35 45x45 110x76', descricao: 'Tecido School' },
        { refencia: '80/20 45x45 133x72', descricao: 'Tecido School Fashion' },
        { refencia: '65/35 45x45 133x72', descricao: 'Tecido Para Tecido Fashion' },
        //refencia Intertela Calsa
        { refencia: '0338', descricao: 'Intertela de Calsa de rolos completos' },
        { refencia: '338', descricao: 'Intertela de Calsa de pequenos rolinhos' },
        //refencia Tecido Calsa
        { refencia: '9293', descricao: 'Tecido de calsa Elastica' },
        { refencia: '9251', descricao: 'Tecido de calsa School' },
        { refencia: '9279', descricao: 'Tecido de calsa School' },
        { refencia: '9177', descricao: 'Tecido de calsa Elastica' },
        { refencia: '9178', descricao: 'Tecido de calsa School' },
        { refencia: '9193', descricao: 'Tecido de calsa School' },
        { refencia: '9194', descricao: 'Tecido de calsa School' },
        { refencia: '9195', descricao: 'Tecido de calsa School' },
        //refencia Tecido Etiqueta
        { refencia: '1965 PEP Cutton', descricao: 'Etiqueta para Camisa' },
        { refencia: 'Student Prince PEP Viscoso', descricao: 'Etiqueta para Calsa' },
        { refencia: 'Top Class Cutton', descricao: 'Etiqueta para Camisa' },
        { refencia: 'Student Prince PEP Cutton', descricao: 'Etiqueta para Camisa' },
        { refencia: 'Top Class Viscoso', descricao: 'Etiqueta para Calsa' },
        { refencia: 'mrp Cutton', descricao: 'Etiqueta para Camisa' },
        { refencia: 'mrp Viscoso', descricao: 'Etiqueta para Calsa' },        
        { refencia: '1965 PEP Viscoso', descricao: 'Etiqueta para Camisa' },  
      ]);
    });
};
