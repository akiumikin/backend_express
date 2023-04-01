import express from 'express'

const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// portのlistenの設定、起動時処理を含む
app.listen(3100, () => {
  console.log("Start on port 3100.")
})

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

///////////////////////////////////////////////
//
// controllers
//
///////////////////////////////////////////////
const requestConsoleInfo = (req: express.Request) => {
  const log = {
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
    route: req.route,
  }

  console.info(log)
}

app.get('/express/db_status', async (req: express.Request, res: express.Response) => {
  requestConsoleInfo(req)
  const client = await pool.connect()

  try {
    const result = await client.query('SELECT NOW() as now')
    res.send({status: true})
  } catch (err) {
    console.error(err)
    res.send({status: false})
  } finally {
    client.release()
  }
})

app.get('/express/system_info', (req: express.Request, res: express.Response) => {
  requestConsoleInfo(req)

  const info = {
    language: 'typescript',
    language_version: '5.0.2',
    framework: 'Express',
    framework_version: '4.18.2'
  }

  res.send(JSON.stringify(info))
})
