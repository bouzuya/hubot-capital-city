# Description
#   A Hubot script that display a random capital city
#
# Configuration:
#   None
#
# Commands:
#   hubot capital-city - display a random capital city
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->

  load = ->
    Path = require 'path'
    Fs = require 'fs'
    file = Path.resolve __dirname, '../../h2604world.csv'
    data = Fs.readFileSync file, encoding: 'utf-8'
    lines = data.trim().split('\r')
    header = lines.shift()
    columns = header.split(',')
    lines.map (line) ->
      line.split(',').reduce (capital, value, index) ->
        column = columns[index]
        capital[column] = value
        capital
      , {}

  format = (c) ->
    [lat, lng] = [c.lat, c.lon]
    query = "center=#{lat},#{lng}&zoom=8&size=600x600"
    url = "http://maps.googleapis.com/maps/api/staticmap?#{query}"
    "#{c.namejp}(#{c.nameen}) #{c.capitaljp}(#{c.capitalen}) #{url}"

  robot.respond /capital[ -]city$/i, (res) ->
    capitals = load()
    res.send format res.random capitals
