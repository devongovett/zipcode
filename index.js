var fs = require('fs');
var trie = null;

/**
 * Parses zip_codes.csv and creates a trie for fast lookups
 */
function loadData() {
  var data = fs.readFileSync(__dirname + '/zip_codes.csv', 'utf8');
  var lines = data.split('\r\n');
  var trie = {};

  lines.forEach(function(line) {
    var parts = line.split(',');
    var zip = parts[0], city = parts[1], state = parts[2];
    var node = trie;
  
    for (var i = 0; i < zip.length; i++) {
      var num = zip[i];
      var pos = node[num];
      if (pos == null)
        node = node[num] = (i === zip.length - 1) ? [city, state] : {};
      else
        node = node[num];
    }
  });
  
  return trie;
}

/**
 * Lookup a zipcode
 * Returns data in [city, state] format
 */
exports.lookup = function(zip) {
  if (zip.length < 5)
    return null;
    
  if (!trie)
    trie = loadData();
    
  var node = trie;
  for (var i = 0; i < zip.length; i++) {
    var node = node[zip[i]];
    if (node == null)
      return null;
  }
  
  return Array.isArray(node) ? node : null;
};
