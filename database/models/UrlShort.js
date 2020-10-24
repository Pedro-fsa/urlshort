const mongoose = require('mongoose');

let urlShortSchema = new mongoose.Schema({
  fullUrl: String,
  short: String,
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("UrlShort", urlShortSchema)