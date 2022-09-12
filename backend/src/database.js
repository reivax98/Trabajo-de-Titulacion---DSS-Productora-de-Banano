const { Pool } = require("pg")
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bd_dss_bananera_prueba",
  password: "root",
  port: 5432,
});
module.exports = pool;

/*
const { Pool } = require("pg")
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bd_dss_bananera_prueba",
  password: "root",
  port: 5432,
});
module.exports = pool;*/