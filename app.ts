import createError   from 'http-errors'
import { HttpError } from 'http-errors';
import express       from 'express'
// import path          from 'path'
import cookieParser  from 'cookie-parser'
import logger        from 'morgan'

import indexRouter  from './routes/index'
import clientRouter from './routes/client'

var app = express();

// portのlistenの設定、起動時処理を含む
app.listen(3100, () => {
  console.log("Start on port 3100.")
})

const requestConsoleInfo = (req: express.Request, next: express.NextFunction) => {
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
  next()
}

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  requestConsoleInfo(req, next)
});
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/express', indexRouter);
app.use('/express/client', clientRouter);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.send({
    error: err.status || 500,
    message: res.locals.message,
    stack: err.stack
  });
  // res.render('error');
});

module.exports = app;
