
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_tipo_usuario').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_tipo_usuario').insert([
        {tipo_usuario:'Limpeza', detalhes:'Reponsavel Por fazer a roupa Manga Curt'},
        {tipo_usuario: 'Maquinista',detalhes:'Reponsavel Por colar a roupa'},
        {tipo_usuario: 'Engomador', detalhes:'Reponsavel Por crtar a roupa'},
        {tipo_usuario: 'Recolha', detalhes:'Reponsavel Por crtar a roupa'},
        {tipo_usuario: 'Fiel Armazem', detalhes:'Reponsavel Por crtar a roupa'}
      ]);
    });
};
		