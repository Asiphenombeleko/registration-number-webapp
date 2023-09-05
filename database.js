import dotenv from 'dotenv'
import pgPromise from 'pg-promise'

dotenv.config();

const connection = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}

const pgp = pgPromise();
const db = pgp(connection);

db.connect()



export default db;

