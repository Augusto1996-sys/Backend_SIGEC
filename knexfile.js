// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'bdcutsheet',
      user: 'root',
      password: ''
    },
    migrations:{
      tableName: 'knex_migrations',
      directory: './src/database/migrations'

    },
    seeds: {        
      
      directory: './src/database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
