const express = require('express');
const router = express.Router();
const validator = require('validator');

const UrlShort = require('../database/models/UrlShort');

const redirectHome = (req, res, message) => {
  req.session.message = message
  res.redirect('/');
}

// Insert new link into database
router.post('/shortUrl', (req, res) => {
  let insertedUrl = req.body.newUrl;

  UrlShort.findOne({short: insertedUrl.short}, (err, foundUrl) => {
    // Check if shorthand is available
    if (foundUrl == null) {
      if (!validator.isURL(insertedUrl.fullUrl) || validator.isEmpty(insertedUrl.fullUrl) || validator.isEmpty(insertedUrl.short)) {
        redirectHome(req, res, 'Error in inserted data.')
      } else {
        UrlShort.create(insertedUrl, (err, newUrl) => {
          if(err) {
            redirectHome(req, res, 'Something went wrong.')
          } else {
            redirectHome(req, res, 'Shortcut successfully created.')
          }
        })
      }
    } else if (foundUrl) {
      redirectHome(req, res, 'Inserted shorthand is not available.')
    } else {
      redirectHome(req, res, 'Something went wrong.')
    }
  })
})

// Returns database object or error message
router.get('/:short' , (req, res) => {
  UrlShort.findOne({short: req.params.short}, (err, foundUrl) => {
    if(foundUrl) {
      res.send(foundUrl);
    } else {
      if (err) {
        let error = {message: 'Something went wrong.'}
        res.send(error);
      } else if(foundUrl == null) {
        let error = {message: 'No such link found.'}
        res.send(error);
      }
    }
    
  })
})


module.exports = router;