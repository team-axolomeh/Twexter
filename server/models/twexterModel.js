// Import pool
const { Pool } = require('pg');

// postgres elephant sql connection url
PG_URI =
  'postgres://jzfaobvj:RXtHa6nLUWgZ_WcttXHgEw8lOmW1fiU9@rajje.db.elephantsql.com/jzfaobvj';

// Establish connection via pool
const pool = new Pool({
  connectionString: PG_URI,
});

// Export a function that logs the query before executing
module.exports = (text, params, callback) => {
  console.log(`Executed query\n${text}`);
  if (params) {
    console.log(`with params: ${params}`);
  }
  // pool.query is async (i.e. returns a promise)
  return pool.query(text, params, callback);
};
