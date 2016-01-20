var fs = require('fs');

module.exports = function(server) {

  var Description = server.models.Description;

  fs.readFile('./server/boot/adjectives', 'utf8', function(err,data) {
    if(err) throw err;

    data.split("\n").forEach(function(line, index, arr) {
      if (index === arr.length - 1 && line === "") { return; }

      Description.create({name:line});
    });
  });
};
