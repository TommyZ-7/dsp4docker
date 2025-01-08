'use server';

import sqlite3 from 'sqlite3';

type List = {
  uuid: string;
  name: string;
  comment: string;
  deletekey: string;
  difficulty: string;
};

export const fetchActions = async () => {
  const db = new sqlite3.Database('./bpData.sqlite3');
  const actions = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM list', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  db.close();
  return actions;
};

