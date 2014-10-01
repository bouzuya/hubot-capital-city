// Description
//   A Hubot script that display a random capital city
//
// Configuration:
//   None
//
// Commands:
//   hubot capital-city - display a random capital city
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var format, load;
  load = function() {
    var Fs, Path, columns, data, file, header, lines;
    Path = require('path');
    Fs = require('fs');
    file = Path.resolve(__dirname, '../../h2604world.csv');
    data = Fs.readFileSync(file, {
      encoding: 'utf-8'
    });
    lines = data.trim().split('\r');
    header = lines.shift();
    columns = header.split(',');
    return lines.map(function(line) {
      return line.split(',').reduce(function(capital, value, index) {
        var column;
        column = columns[index];
        capital[column] = value;
        return capital;
      }, {});
    });
  };
  format = function(c) {
    var lat, lng, query, url, _ref;
    _ref = [c.lat, c.lon], lat = _ref[0], lng = _ref[1];
    query = "center=" + lat + "," + lng + "&zoom=8&size=600x600";
    url = "http://maps.googleapis.com/maps/api/staticmap?" + query;
    return "" + c.namejp + "(" + c.nameen + ") " + c.capitaljp + "(" + c.capitalen + ") " + url;
  };
  return robot.respond(/capital[ -]city$/i, function(res) {
    var capitals;
    capitals = load();
    return res.send(format(res.random(capitals)));
  });
};
