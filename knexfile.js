module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgress://postgres:postgres@localhost:5432/prueba'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }  
};

