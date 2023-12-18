import sqlite3 from 'sqlite3';
import path from "path"
import { comparePassword, hashPassword } from './secure.js';
import jwt from 'jsonwebtoken';
function cdb(){
  let pth = path.resolve(process.cwd(),'a.sqlite')
  console.log(pth);
  let db = new sqlite3.Database(pth);
  return db;
}
function createAdmin(name, email, phone, password, joining_date) {
  let db = cdb()
  return new Promise((resolve, reject) => {
    hashPassword(password)
      .then((hash) => {
        db.serialize(() => {
          db.get(
            'SELECT COUNT(*) as count FROM admin WHERE email=? OR phone=?',
            [email, phone],
            (err, row) => {
              if (err) {
                reject(err.message);
                db.close();
              } else {
                const isx = row.count > 0;
                if (isx) {
                  reject('Email or phone already exist');
                  db.close();
                } else {
                  const stmt = db.prepare(`
                    INSERT INTO admin (name,email,phone,password,joining_date)
                    VALUES (?,?,?,?,?)
                  `);
                  stmt.run(name, email, phone, hash, joining_date);
                  stmt.finalize();
                  db.each(
                    `SELECT name,email,phone,joining_date FROM admin WHERE email=?`,
                    [email],
                    (err, row) => {
                      if (err) {
                        reject(err.message);
                        db.close();
                      } else {
                        resolve(row);
                        db.close();
                      }
                    }
                  );
                }
              }
            }
          );
        });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}

function adminLogin(email, password) {
  return new Promise((resolve, reject) => {
    const db = cdb();

    db.serialize(() => {
      db.get(
        'SELECT * FROM admin WHERE email = ?',
        [email],
        (err, row) => {
          if (err) {
            db.close();
            reject(err.message);
          } else if (!row) {
            db.close();
            reject('Invalid email');
          } else {
            comparePassword(password, row.password)
              .then(() => {
                const tokenData = {
                  name: row.name,
                  email: row.email,
                  joining_date: row.joining_date,
                };

                jwt.sign(
                  tokenData,
                  process.env.SECRET,
                  { expiresIn: '1h' },
                  (err, token) => {
                    db.close();
                    if (err) {
                      reject(err.message);
                    } else {
                      resolve(token);
                    }
                  }
                );
              })
              .catch((err) => {
                db.close();
                reject(err.message);
              });
          }
        }
      );
    });
  });
}


// createAdmin(
//     "sundeep sharma",
//     "gsf@bgf.mn",
//     "1234567890",
//     "sikkim",
//     new Date()
// ).then(dt=>console.log(dt))

export { createAdmin, adminLogin };

// db.run(`
//     CREATE TABLE IF NOT EXISTS admin (
//       id INTEGER PRIMARY KEY,
//       name TEXT,
//       email TEXT,
//       phone TEXT,
//       password TEXT,
//       joining_date,joining_date
//     )
//   `);