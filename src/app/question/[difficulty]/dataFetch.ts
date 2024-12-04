'use server';

import sqlite3 from 'sqlite3';

type List = {
  uuid: string;
  name: string;
  comment: string;
  deletekey: string;
  difficulty: string;
};

export const fetchActions = async (difficulty : string) => {
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

  const returnData = JSON.parse(JSON.stringify(actions));

  console.log(difficulty);

  let easyData: List[] = [];
  if (difficulty === 'easy') {
    returnData.forEach((data: any) => {
      if (data.difficulty === "1") {
        easyData.push(data);
      }
    });
    return easyData;

  } else if (difficulty === 'normal') {
    returnData.forEach((data: any) => {
      if (data.difficulty === "2") {
        easyData.push(data);
      }
    });
    return easyData;

  } else if (difficulty === 'hard') {
    returnData.forEach((data: any) => {
      if (data.difficulty === "3") {
        easyData.push(data);
      }
    });
    return easyData;


  } else {
    return easyData;
  }


  
  console.log(easyData)

};
