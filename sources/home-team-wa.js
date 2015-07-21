var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://hometeambbq.com/music-and-special-events/calendar/category/west-ashley/'
  , shows = []

function hometeamwa(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)

    $('#eventList').find('li').each(function(i, elem) {
      var year = $(elem).parent().parent().attr('id').split('-')[1]
      var month = $(elem).parent().parent().attr('id').split('-')[0]
      var day = getDay($(elem).find('h3').text().split(':')[0].trim().split('. ')[1])
      var show = {
        name: "Home Team Sullivan's Island",
        title: $(elem).find('h3').text().split(':')[1].trim(),
        date: year + '-' + month + '-' + day,
        price: $(elem).find('h4.price').text(),
        details: $(elem).find('h5 span').text()
      }
      console.log(show)
      shows.push(show)
    })
    done(null, shows)
  })
}

function getMonth(str) {
  var months = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May.',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.'
    ]
  var month = (months.indexOf(str) + 1).toString()
  //console.log(month)
  if(month.length === 1) month = '0' + month
  return month
}

function getDay(str) {
  var day = str.toString()
  if(day.length === 1) day = '0' + day
  return day
}

module.exports = hometeamwa(function(){})