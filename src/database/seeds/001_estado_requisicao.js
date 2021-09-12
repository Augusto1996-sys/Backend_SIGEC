
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_estado_requisicao').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_estado_requisicao').insert([
        {nome: 'salva', descricao:'Adicionada pela recolha e a espera da aprovacao do coordenador'},
        {nome: 'aprovada', descricao:'Assinada pelo coordenador e a espera de ser atendida no armazem'},
        {nome: 'satisfeita', descricao:'O Armazem satisfez a requisicao'},        
        {nome: 'negada', descricao:'O Arzem ou o coordenador nao chumbaram a requisicao'}
      ]);
    });
};

