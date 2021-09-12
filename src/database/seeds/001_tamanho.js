
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_tamanho').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_tamanho').insert([
        //Tamanho Etiqueta Camisa
                   
        {tamanho: 'none', detalhes:'Material Sem nenhum tipo de Tamanho'},
        {tamanho: '5/6', detalhes:'Tamanho de Etiqueta Para Camisa'},
        {tamanho: '6/7', detalhes:'Tamanho de Etiqueta Para Camisa'},
        {tamanho: '7/8', detalhes:'Tamanho de Etiqueta Para Camisa'},
        {tamanho: '9/10', detalhes:'Tamanho de Etiqueta Para Camisa'},
        {tamanho: '11/12', detalhes:'Tamanho de Etiqueta Para Camisa'},
        {tamanho: '13', detalhes:'Tamanho de Etiqueta Para Camisa'},
        {tamanho: '14', detalhes:'Tamanho de Etiqueta Para Camisa'},
        {tamanho: '15', detalhes:'Tamanho de Etiqueta Para Camisa'},        
        {tamanho: '16', detalhes:'Tamanho de Etiqueta Para Camisa'},
        {tamanho: '17', detalhes:'Tamanho de Etiqueta Para Camisa'},

        //Tamanho Zipper 
        {tamanho: '9', detalhes:'Tamanho de Zipper Para Calsa'},
        {tamanho: '10', detalhes:'Tamanho de Zipper Para Calsa'},
        {tamanho: '11', detalhes:'Tamanho de Zipper Para Calsa'},
        {tamanho: '12', detalhes:'Tamanho de Zipper Para Calsa'},
        {tamanho: '13', detalhes:'Tamanho de Zipper Para Calsa'},
        {tamanho: '14', detalhes:'Tamanho de Zipper Para Calsa'},
        {tamanho: '15', detalhes:'Tamanho de Zipper Para Calsa'},        
        {tamanho: '16', detalhes:'Tamanho de Zipper Para Calsa'},
        {tamanho: '17', detalhes:'Tamanho de Zipper Para Calsa'},        
        {tamanho: '18', detalhes:'Tamanho de Zipper Para Calsa'},

         //Tamanho Etiqueta Camisa Fashion
        {tamanho: 'XS', detalhes:'Tamanho de Etiqueta Para Camisa Fashin'},
        {tamanho: 'S', detalhes:'Tamanho de Etiqueta Para Camisa Fashin'},
        {tamanho: 'M', detalhes:'Tamanho de Etiqueta Para Camisa Fashin'},
        {tamanho: 'L', detalhes:'Tamanho de Etiqueta Para Camisa Fashin'},
        {tamanho: 'XL', detalhes:'Tamanho de Etiqueta Para Camisa Fashin'},

        //Tamanho Etiqueta Calsa
        {tamanho: '4', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '5/6', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '6/7', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '7/8', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '8/9', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '9/10', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '11', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '12', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '28', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '30', detalhes:'Tamanho de Etiqueta Para Calsa'},        
        {tamanho: '32', detalhes:'Tamanho de Etiqueta Para Calsa'},
        
        
        {tamanho: '14.5', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '15.5', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '16.5', detalhes:'Tamanho de Etiqueta Para Calsa'},        
        {tamanho: '17.5', detalhes:'Tamanho de Etiqueta Para Calsa'},
        {tamanho: '11.5', detalhes:'Tamanho de Etiqueta Para Calsa'}, 

      ]);
    });
};
