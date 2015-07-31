var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://theroyalamerican.com/schedule/'
  , shows = []
  , months = ['January', 
              'February', 
              'March', 
              'April', 
              'May', 
              'June', 
              'July', 
              'August', 
              'September', 
              'October', 
              'November', 
              'December']

function royalamerican (done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.gig').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      var title = $$('.title').text().trim()
      if($$('.with').text().trim()) title += $$('.with').text().trim()
      var date = $$('.date').text().trim()
      var year = $('#gigs_left').children().attr('name')
      date = normalizeDate(date, year)
      var show = {
        venue: 'The Royal American',
        venueUrl: 'http://theroyalamerican.com/',
        title: title,
        url: $$('.details').first().find('a').attr('href'),
        date: date
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = royalamerican

function normalizeDate(date, year) {
  var newDate = []
  date = date.split(' ')
  var day = date.pop()
  if(day.length < 2) day = '0'+day
  var month = date.pop()
  month = (months.indexOf(month)+1).toString()
  if(month.length < 2) month = '0'+month
    year = year.split('_')[1]
  newDate.push(year)
  newDate.push(month)
  newDate.push(day)
  return newDate.join('-')
}