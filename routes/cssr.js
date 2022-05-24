var express = require('express');
var router = express.Router();

const pgp = require('pg-promise')(/* options */)
const db = pgp(process.env.CSSR_DB)

/* GET age counts. */
router.get('/ageCounts', function(req, res, next) {
  db.many('SELECT * FROM public.chart_age_counts')
  .then((data) => {
    console.log('DATA:', data)
    res.json(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
    res.status(500);
  })
});

module.exports = router;
