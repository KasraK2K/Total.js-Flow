module.exports = {
  development: {
      client: 'postgresql',
      connection: {
          host: 'postgres',
          database: 'total',
          user: 'postgres',
          password: 'postgres'
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
          host: 'postgres',
          database: 'total',
          user: 'postgres',
          password: 'postgres'
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      }
  }
}
