import { createConnection } from "mysql2";

var mysqlDb;

function connectMySql() {
    return new Promise((resolve, reject) => {
        mysqlDb = createConnection({
            host: "localhost",
            user: "root",
            password: "admin",
            database: "new_schema",
        }).promise();
        resolve();
    });
}

export { connectMySql, mysqlDb };
// export const db = createConnection({
//     host: "localhost",
//     user: "root",
//     password: "admin",
//     database: "new_schema",
// }).promise();
