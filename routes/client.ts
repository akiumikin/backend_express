import express from 'express'
const router = express.Router();

/* GET client listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
