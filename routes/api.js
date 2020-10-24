const express = require('express');
const router = express.Router();
const validator = require('validator');

const UrlShort = require('../database/models/UrlShort');

router.post('/shortUrl', (req, res) => {
  console.log(req.body.newUrl)
  let insertedUrl = req.body.newUrl;
  if (!validator.isURL(insertedUrl.fullUrl) || validator.isEmpty(insertedUrl.fullUrl) || validator.isEmpty(insertedUrl.short)) {
    console.log('Error in inserted data');
    res.redirect('back');
  } else {
    UrlShort.create(insertedUrl, (err, newUrl) => {
      if(err) {
        console.log(err);
      } else {
        console.log('Added to Database.');
        console.log(newUrl);
        res.redirect('back');
      }
    })
  }
})

router.get('/:short' , (req, res) => {
  UrlShort.findOne({short: req.params.short}, (err, foundUrl) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundUrl);
      res.send(foundUrl);
    }
  })
})


module.exports = router;