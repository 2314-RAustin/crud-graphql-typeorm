import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";
import { DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME, DB_HOST, DB_DATABASE } from './config';

export const connectDB = async () => {
  await createConnection({
    type: "mysql",
    username: DB_USERNAME, 
    password: DB_PASSWORD,
    port: Number(DB_PORT),
    name: DB_NAME,
    host: DB_HOST,
    database: DB_DATABASE,
    entities: [Users],
    synchronize: false,
    ssl: false,
  });
};
