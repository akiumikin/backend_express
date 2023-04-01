import express from 'express'
import pool from './../lib/dbAdapter'
import { Pool, PoolClient } from 'pg'

const router = express.Router();

router.get('/system_info', (req: express.Request, res: express.Response) => {
  const info = {
    language: 'typescript',
    language_version: '5.0.2',
    framework: 'Express',
    framework_version: '4.18.2'
  }

  res.status(200).json(info)
})

router.get('/db_status', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const dbClient = await pool.connect()

  try {
    const result = await dbClient.query('SELECT NOW() as now')
    console.log(result)
    res.status(200).json({status: !!result.rows})
  } catch (err) {
    console.error(err)
    next(err)
  } finally {
    dbClient.release()
  }
})

export default router
