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

export const ImportAction = async (data: Action[], info: Info) => {
  console.log('import');
  console.log(data);
  const uuidv = 'a' + uuid().replace(/-/g, '');
  const deletekey = 'test';
  const db = new sqlite3.Database('./bpData.sqlite3');

  await new Promise((resolve, reject) => {
    db.all(
      `CREATE TABLE IF NOT EXISTS list ( uuid TEXT, name TEXT, comment TEXT, deletekey TEXT, difficulty TEXT, creator TEXT, grade TEXT)`,
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
      `INSERT INTO list values('${uuidv}', '${info.name}', '${info.comment}' , '${deletekey}', '${info.difficulty}', '${info.creator}', '${info.grade}')`,
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
      `CREATE TABLE ${uuidv} (question TEXT, list TEXT, answer TEXT, comment TEXT)`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });

  for (let i = 0; i < data.length; i++) {
    await new Promise((resolve, reject) => {
      db.all(
        `INSERT INTO ${uuidv} values( '${data[i].question}', '${data[i].list}', '${data[i].answer}', '${data[i].comment}')`,
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

  db.close();
  return 'success';
};
