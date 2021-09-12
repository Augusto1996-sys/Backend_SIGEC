
exports.up = function(knex) {
    return knex.schema.createTable('tb_material_requisicao', function(table){
        table.increments('pk_id_material_requisicao').primary();      
        table.integer('fk_id_stock').unsigned().notNullable();
        table.integer('fk_id_requisicao').unsigned().notNullable();
        table.double('quantidade_req').notNullable();   
        
        
        table.foreign('fk_id_stock').references('pk_id_stock').inTable('tb_stock');
        table.foreign('fk_id_requisicao').references('pk_id_requisicao').inTable('tb_requisicao');
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_material_requisicao');
  };
          