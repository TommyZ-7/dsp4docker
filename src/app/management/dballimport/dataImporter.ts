'use server';

import sqlite3 from 'sqlite3';

export const importActions = async (data: string) => {
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  const db = new sqlite3.Database('./bpData.sqlite3');
  const tableSize = Object.keys(jsonData).length - 1;
  const tableData = Object.keys(jsonData);

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

  for (let i = 0; i < tableSize; i++) {
    await new Promise((resolve, reject) => {
      db.all(
        `INSERT INTO list values('${jsonData.list[i].uuid}', '${jsonData.list[i].name}', '${jsonData.list[i].comment}' , '${jsonData.list[i].deletekey}', '${jsonData.list[i].difficulty}', '${jsonData.list[i].creator}', '${jsonData.list[i].grade}')`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    await new Promise((resolve, reject) => {
      db.all(
        `CREATE TABLE ${jsonData.list[i].uuid} (question TEXT, list TEXT, answer TEXT, comment TEXT)`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  for (let i = 0; i < tableSize; i++) {
    let tableName = tableData[i + 1];
    let tableInData = jsonData[tableData[i + 1]];
    for (let j = 0; j < tableInData.length; j++) {
      await new Promise((resolve, reject) => {
        db.all(
          `INSERT INTO ${tableName} values('${tableInData[j].question}', '${tableInData[j].list}', '${tableInData[j].answer}', '${tableInData[j].comment}')`,
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    }
  }

  db.close();

  return 'ok';
};
