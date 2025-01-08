'use server';

import sqlite3 from 'sqlite3';

import { v4 as uuid } from 'uuid';

type Action = {
  id: number;
  question: string;
  list: string;
  answer: string;
  comment: string;
};
type Info = {
  name: string;
  comment: string;
  difficulty: string;
  creator: string;
  grade: string;
};

export const ImportAction = async (name:string) => {
  console.log('import');
  const uuidv = 'a' + uuid().replace(/-/g, '');
  const deletekey = 'test';
  const db = new sqlite3.Database('./bpData.sqlite3');

  await new Promise((resolve, reject) => {
    db.all(
      `CREATE TABLE IF NOT EXISTS list ( name TEXT)`,
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
      `INSERT INTO list values('${name}')`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
  
  db.close();
  return 'success';
};
