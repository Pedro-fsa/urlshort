const express = require('express');
const router = express.Router();

const UrlShort = require('../database/models/UrlShort');

const redirectHome = (req, res, message) => {
  req.session.message = message
  res.redirect('/');
}

// Redirects to requested page or shows error message
router.get('/:short', (req, res) => {
  if(req.params.short) {
    // console.log(`SHORT: ${req.params.short}`)
    UrlShort.findOne({short: req.params.short}, (err, foundUrl) => {
      if (foundUrl) {
        res.redirect(foundUrl.fullUrl);
      } else {
        if (err) {
          redirectHome(req, res, 'Something went wrong.')
        } else if (foundUrl == null) {
          redirectHome(req, res, 'No such link found.')
        }
      }
    })
  }
})

// Root route
router.get('/', (req, res) => {
  let message = req.session.message;
  res.render('index', {message: message});
})

module.exports = router;