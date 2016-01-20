var random = require('random-js')();


module.exports = function(Description) {

  Description.disableRemoteMethod("create", true);
  Description.disableRemoteMethod("upsert", true);
  Description.disableRemoteMethod("updateAll", true);
  Description.disableRemoteMethod("updateAttributes", false);
  Description.disableRemoteMethod("findById", false);
  Description.disableRemoteMethod("findOne", true);
  Description.disableRemoteMethod("deleteById", true);
  Description.disableRemoteMethod("confirm", true);
  Description.disableRemoteMethod("count", false);
  Description.disableRemoteMethod("exists", true);
  Description.disableRemoteMethod("resetPassword", true);
  Description.disableRemoteMethod("createChangeStream", true);

Description.remoteMethod(
  'Random',
  {
    http: {path: '/Random', verb: 'get'},
    returns: { arg: 'Results', type: 'string'}
  }
);

Description.Random = function(cb) {
  Description.count(null, function(err,res) {
    if(err) {
      console.log(err);
      cb(err);
    }
    else {

      var randomValue = random.integer(1,res);


Description.findById(randomValue, function(err,res) {
  if(err) {
    console.log(err);
    cb(err);
  }
  else {
    var DescriptiveRubberDucky = res.name + ' Rubber Duck';
    cb(null,DescriptiveRubberDucky);
  }
});

}
});
}


};
