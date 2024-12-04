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

export const UpdateAction = async (pathnames: string, data: Action[], info: Info) => {
  console.log('update');
  console.log(data);
  const uuidv = 'a' + uuid().replace(/-/g, '');
  const deletekey = 'test';
  const db = new sqlite3.Database('./bpData.sqlite3');

  await new Promise((resolve, reject) => {
    db.all(
      `UPDATE list SET name = '${info.name}', comment = '${info.comment}', difficulty = '${info.difficulty}', creator = '${info.creator}', grade = '${info.grade}' WHERE uuid = '${pathnames}'`,
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
    db.all(`DELETE FROM ${pathnames}`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  for (let i = 0; i < data.length; i++) {
    await new Promise((resolve, reject) => {
      db.all(
        `INSERT INTO ${pathnames} values( '${data[i].question}', '${data[i].list}', '${data[i].answer}', '${data[i].comment}')`,
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
