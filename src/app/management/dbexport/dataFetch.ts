'use server';

import sqlite3 from 'sqlite3';

export const fetchActions = async () => {
  const db = new sqlite3.Database('./bpData.sqlite3');
  const allTablesData: { [key: string]: any } = {};

  const tables = await new Promise<string[]>((resolve, reject) => {
    db.all(
      "SELECT name FROM sqlite_master WHERE type='table'",
      (err, tableRows: { name: string }[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(tableRows.map((row) => row.name));
        }
      }
    );
  });

  for (const tableName of tables) {
    const tableData = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    allTablesData[tableName] = tableData;
  }
  console.log(allTablesData);
  db.close();
  //actionをjsonとして返す
  return allTablesData;
};
