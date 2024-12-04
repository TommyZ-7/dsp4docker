'use server';

import sqlite3 from 'sqlite3';

export const fetchActions = async (uuid: string) => {
  const db = new sqlite3.Database('./bpData.sqlite3');
  const actions = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM ' + uuid, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  db.close();
  return JSON.parse(JSON.stringify(actions));
};
