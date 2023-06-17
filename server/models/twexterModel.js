// Import pool
const { Pool } = require('pg');
require('dotenv').config();

// postgres elephant sql connection url
PG_URI = process.env.PG_URI;

// Establish connection via pool
const pool = new Pool({
  connectionString: PG_URI,
});

// Export a function that logs the query before executing
module.exports = {
  query: (text, params, callback) => {
    console.log(`Executed query\n${text}`);
    if (params) {
      console.log(`with params: ${params}`);
    }
    // pool.query is async (i.e. returns a promise)
    return pool.query(text, params, callback);
  },
};
