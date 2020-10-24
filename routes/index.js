const express = require('express');
const router = express.Router();
const axios = require('axios');

const UrlShort = require('../database/models/UrlShort');


router.get('/:short', (req, res) => {
  if(req.params.short) {
    console.log(`SHORT: ${req.params.short}`)
    UrlShort.findOne({short: req.params.short}, (err, foundUrl) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        console.log(foundUrl);
        res.redirect(foundUrl.fullUrl);
      }
    })
  }
})

router.get('/', (req, res) => {
  res.render('index');
})



module.exports = router;