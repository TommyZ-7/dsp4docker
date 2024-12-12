'use server';

import sqlite3 from 'sqlite3';

export const fetchActions = async () => {
  const db = new sqlite3.Database('./bpData.sqlite3');
  //全てのデータを削除

  db.run(``);

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

  console.log(tables);

  for (const tableName of tables) {
    if (tableName === 'list') {
      db.run(`DELETE FROM ${tableName}`);
      db.run(`VACUUM`);
    } else {
      db.run(`DROP TABLE ${tableName}`);
      db.run(`VACUUM`);
    }
  }

  return 'ok';
};
