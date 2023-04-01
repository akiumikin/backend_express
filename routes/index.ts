import express from 'express'
const router = express.Router();

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify({test: 1}));
});

router.get('/system_info', (req: express.Request, res: express.Response) => {
  // requestConsoleInfo(req)

  const info = {
    language: 'typescript',
    language_version: '5.0.2',
    framework: 'Express',
    framework_version: '4.18.2'
  }

  res.send(JSON.stringify(info))
})

export default router
