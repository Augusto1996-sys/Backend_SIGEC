
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_operacoes').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_operacoes').insert([
        //Operacoes Calsa School
        {nome_operacao:'Recolha'},
        {nome_operacao:'Supervisor'},
        {nome_operacao: 'Colocar vistas	'},
        {nome_operacao: 'Well Pocket'},
        {nome_operacao: 'Remante de well Pocket'},
        {nome_operacao: 'choleio bolso de frente'},        
        {nome_operacao:'Colocar Zipper'},
        {nome_operacao: 'Dispontar Calceira'},
        {nome_operacao: 'Fechar Lado'},
        {nome_operacao: 'Colocar Pega_Cinto'},
        {nome_operacao: 'Chuleio calseiro'},
        {nome_operacao:'colocar bolso tras'},
        {nome_operacao: 'Disponto de bolso'},
        {nome_operacao: 'Remate de bolso'},
        {nome_operacao: 'Coziar'},
        {nome_operacao: 'Unir Calceira'},
        {nome_operacao:'Colocar Calceira'},
        {nome_operacao: 'Eruth'},
        {nome_operacao: 'prega de traseira'},
        {nome_operacao: 'colocar bolso frente'},
        {nome_operacao: 'Prega'}
      ]);
    });
};
		