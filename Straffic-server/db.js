"use strict";
const mysql = require("mysql");

const config = {
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
  connectionLimit: 100000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
};

let pool = mysql.createPool(config);

module.exports = (requestString, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (!connection) reject("DB error");
      else connection.query(requestString, params, (err, result) => {
        if (err) reject(err);
        resolve(result);
        connection.release();
      });
    });
  });
};
