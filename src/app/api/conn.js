import mysql from "mysql";

export default function cdb() {
    try{
      let con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DBNAME,
        port: 3312
    });

    con.connect(err => {
        if (err) {
            console.log(err);
        }
        console.log("database connected!");
    });

    return con;
    }catch(err){
console.log("error db connection");
    }
}
