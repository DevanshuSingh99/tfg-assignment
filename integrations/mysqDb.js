import { createConnection } from "mysql2";

var mysqlDb;

function connectMySql() {
    return new Promise((resolve, reject) => {
        mysqlDb = createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
        }).promise();
        resolve();
    });
}

export { connectMySql, mysqlDb };
