import express from 'express'
const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "*");
  next();
})

app.listen(3100, () => {
  console.log("Start on port 3100.")
})

app.get('/express/system_info', (req: express.Request, res: express.Response) => {
  // console.log(req)
  debugger

  const info = {
    language: 'typescript',
    language_version: '5.0.2',
    framework: 'Express',
    framework_version: '4.18.2'
  }

  res.send(JSON.stringify(info))
})
