import mysql from "mysql";

export default function cdb() {
    let con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DBNAME
    });

    con.connect(err => {
        if (err) {
            console.log(err);
        }
        console.log("database connected!");
    });

    return con;
}
