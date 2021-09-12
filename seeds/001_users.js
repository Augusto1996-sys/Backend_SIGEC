//const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      //const password = bcrypt.hash('1234', 10);
      return knex('users').insert([
        {name:'Augusto Xavier Novela',
         email: 'augustoxiquinho@gmail.com',
         password: '12345'}
      ]);
    });
};
