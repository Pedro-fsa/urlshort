const express = require('express');
const router = express.Router();
const axios = require('axios');

const UrlShort = require('../database/models/UrlShort');


router.get('/:short', (req, res) => {
  if(req.params.short) {
    // console.log(`SHORT: ${req.params.short}`)
    UrlShort.findOne({short: req.params.short}, (err, foundUrl) => {
      if (foundUrl) {
        res.redirect(foundUrl.fullUrl);
      } else {
        if (err) {
          res.render('index', {error: 'Something went wrong.'})
        } else if (foundUrl == null) {
          res.render('index', {error: 'No such link found.'});
        }
      }
    })
  }
})

router.get('/error/:error', (req, res) => {
  res.render('index', {
    error: req.params.error
  })
})

router.get('/', (req, res) => {
  res.render('index');
})



module.exports = router;