
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_linha').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_linha').insert([
        {nome_sector: 'Producao', nr_linha:1,  descricao:'Reponsavel Por Produzir camizas fashions ou School'},
        {nome_sector: 'Producao', nr_linha:2,  descricao:'Reponsavel Por Produzir camizas School'},
        {nome_sector: 'Producao', nr_linha:3,  descricao:'Reponsavel Por Produzir camizas'},
        {nome_sector: 'Producao', nr_linha:4,  descricao:'Reponsavel Por Produzir camizas'},
        {nome_sector: 'Producao', nr_linha:5,  descricao:'Reponsavel Por Produzir camizas'},
        {nome_sector: 'Producao', nr_linha:6,  descricao:'Reponsavel Por Produzir camizas'},
        {nome_sector: 'Producao', nr_linha:7,  descricao:'Reponsavel Por Produzir Calsas Elasticas'},
        {nome_sector: 'Producao', nr_linha:8,  descricao:'Reponsavel Por Produzir Calsas School'},
        {nome_sector: 'Producao', nr_linha:9,  descricao:'Reponsavel Por Produzir camizas'},
        {nome_sector: 'Producao', nr_linha:10,  descricao:'Reponsavel Por Produzir camizas'},
        {nome_sector: 'Colagem', nr_linha:0, descricao:'Reponsavel Por colar a roupa'},
        {nome_sector: 'Corte', nr_linha:0,	descricao:'Reponsavel Por crtar a roupa'},
        {nome_sector: 'Acabamento', nr_linha:0,  descricao:'Reponsavel Embalar a roupa feita no sector de producao'},
        
        {nome_sector: 'Armazem', nr_linha:0,	descricao:'Reponsavel Por Entregar o material'},
      ]);
    });
};

