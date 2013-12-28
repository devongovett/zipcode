var assert = require('assert');
var zipcode = require('./');
var fs = require('fs');

var data = fs.readFileSync('./zip_codes.csv', 'utf8');
var lines = data.split('\r\n');

lines.forEach(function(line) {
  var parts = line.split(',');
  var zip = parts[0], city = parts[1], state = parts[2];
  
  assert.deepEqual(zipcode.lookup(zip), [city, state]);
});
