var express = require('express');
var router = express.Router();

const pgp = require('pg-promise')(/* options */)
const db = pgp(process.env.CSSR_DB)

/* GET number of accidents. */
router.get('/numberOfAccidents', function(req, res, next) {
  db.one('SELECT COUNT(*) AS "number_of_accidents" FROM public.accident')
  .then((data) => {
    console.log('DATA:', data)
    res.json(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
    res.status(500);
  })
});

/* GET number of any injuries. */
router.get('/numberOfInjuries', function(req, res, next) {
  db.one(`
    SELECT COUNT(*) AS "number_of_injuries"
    FROM public.person per
    WHERE per.injsev_imname = 'Suspected Serious Injury (A)'
    OR per.injsev_imname = 'Possible Injury (C)'
    OR per.injsev_imname = 'Suspected Minor Injury (B)'
    OR per.injsev_imname = 'Fatal Injury (K)'
    OR per.injsev_imname = 'Injured, Severity Unknown'
    OR per.injsev_imname = 'Died Prior to Crash*';`)
  .then((data) => {
    console.log('DATA:', data)
    res.json(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
    res.status(500);
  })
});

/* GET number of serious injuries. */
router.get('/numberOfSeriousInjuries', function(req, res, next) {
  db.one(`
    SELECT COUNT(*) AS "number_of_serious_injuries"
    FROM public.person per
    WHERE per.injsev_imname = 'Suspected Serious Injury (A)';`)
  .then((data) => {
    console.log('DATA:', data)
    res.json(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
    res.status(500);
  })
});

/* GET number of fatalities. */
router.get('/numberOfFatalities', function(req, res, next) {
  db.one(`
    SELECT COUNT(*) AS "number_of_fatalities"
    FROM public.person per
    WHERE per.injsev_imname = 'Fatal Injury (K)'
    OR per.injsev_imname = 'Died Prior to Crash*';`)
  .then((data) => {
    console.log('DATA:', data)
    res.json(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
    res.status(500);
  })
});

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
