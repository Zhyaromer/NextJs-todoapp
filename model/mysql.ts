// lib/mysql.js
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',      
  user: 'root',           
  password: 'Zhyarking2004@@',    
  database: 'my_database',
});

export const query = (sql: string, values: any[]) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(results);
    });
  });
};
