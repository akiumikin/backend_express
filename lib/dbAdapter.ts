///////////////////////////////////////////////
//
// database
// https://node-postgres.com
//
///////////////////////////////////////////////
import { Pool } from 'pg'

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  user: 'info',
  database: 'myapp',
  password: 'password',
})

export default pool
